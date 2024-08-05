using HtmlAgilityPack;

namespace Common.Utils
{
    public class NestedElement
    {
        public string Content { get; set; }
        public int Indent { get; set; }
        public string Classes { get; set; }
    }

    public class QuillConverter
    {
        public static string ConvertQuillDeltaToHtml(string text)
        {
            var result = text;
            result = ModifyIFrame(result);
            result = DecodeIndent(result);
            return result;
        }

        public static string ModifyIFrame(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }

            var doc = new HtmlDocument();
            doc.LoadHtml(text);

            var tempEl = doc.DocumentNode;

            var iframeNode = tempEl.SelectSingleNode("//iframe[@class='ql-video']");
            
            if (iframeNode == null)
            {
                return text;
            }
            
            iframeNode.SetAttributeValue("class", "responsive-iframe");

            var divNode = HtmlNode.CreateNode("<div></div>");
            divNode.SetAttributeValue("class", "videoContainer");

            divNode.AppendChild(iframeNode.CloneNode(true));
            iframeNode.ParentNode.ReplaceChild(divNode, iframeNode);

            return tempEl.OuterHtml;
        }

        public static string DecodeIndent(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }

            var doc = new HtmlDocument();
            doc.LoadHtml(text);

            var tempEl = doc.DocumentNode;
            var listTypes = new[] { "ul", "ol" };

            foreach (var type in listTypes)
            {
                var outerListEls = tempEl.SelectNodes($"//{type}");
                if (outerListEls == null) continue;

                foreach (var outerListEl in outerListEls)
                {
                    var listChildren = outerListEl.ChildNodes.Where(e => e.Name == "li").ToList();

                    int lastLiLevel = 0;
                    var parentElementsStack = new Stack<HtmlNode>();
                    var root = HtmlNode.CreateNode($"<{type}></{type}>");
                    parentElementsStack.Push(root);

                    foreach (var e in listChildren)
                    {
                        int currentLiLevel = GetQuillListLevel(e);
                        RemoveIndentClass(e, currentLiLevel);
                        int difference = currentLiLevel - lastLiLevel;
                        lastLiLevel = currentLiLevel;

                        if (difference > 0)
                        {
                            for (int i = 0; i < difference; i++)
                            {
                                var lastLiInCurrentLevel = parentElementsStack.Peek().LastChild;
                                if (lastLiInCurrentLevel == null)
                                {
                                    lastLiInCurrentLevel = HtmlNode.CreateNode("<li></li>");
                                    AddChildToCurrentParent(parentElementsStack, lastLiInCurrentLevel);
                                }

                                var newList = HtmlNode.CreateNode($"<{type}></{type}>");
                                lastLiInCurrentLevel.AppendChild(newList);
                                parentElementsStack.Push(newList);
                            }
                        }

                        if (difference < 0)
                        {
                            for (int i = 0; i < -difference; i++)
                            {
                                parentElementsStack.Pop();
                            }
                        }

                        AddChildToCurrentParent(parentElementsStack, e);
                    }

                    outerListEl.InnerHtml = root.InnerHtml;
                }
            }

            return tempEl.InnerHtml;
        }

        private static List<NestedElement> UnwindElement(string listType, HtmlNode li, int level)
        {
            var childElements = li.ChildNodes
                .Where(innerElement => innerElement.Name == listType.ToLower())
                .SelectMany(innerList => innerList.ChildNodes
                    .Where(nestedListElement => nestedListElement.Name == "li")
                    .Select(nestedListElement => UnwindElement(listType, nestedListElement, level + 1)))
                .SelectMany(e => e)
                .ToList();

            var current = new NestedElement
            {
                Classes = li.GetClasses().Aggregate((a, b) => a + " " + b),
                Content = li.InnerHtml,
                Indent = level
            };

            return new List<NestedElement> { current }.Concat(childElements).ToList();
        }

        private static string GetLi(NestedElement e)
        {
            string classes = e.Indent > 0 ? GetIndentClass(e.Indent) : string.Empty;
            if (!string.IsNullOrEmpty(e.Classes))
            {
                classes = string.IsNullOrEmpty(classes) ? e.Classes : $"{classes} {e.Classes}";
            }

            return $"<li{(string.IsNullOrEmpty(classes) ? string.Empty : $" class=\"{classes}\"")}>{e.Content}</li>";
        }

        private static int GetQuillListLevel(HtmlNode el)
        {
            var indentClass = el.GetClasses().FirstOrDefault(c => c.StartsWith("ql-indent-"));
            return indentClass != null ? int.Parse(new string(indentClass.Where(char.IsDigit).ToArray())) : 0;
        }

        private static string GetIndentClass(int level) => $"ql-indent-{level}";

        private static void AddChildToCurrentParent(Stack<HtmlNode> parentStack, HtmlNode child)
        {
            var currentParent = parentStack.Peek();
            currentParent.AppendChild(child);
        }

        private static void RemoveIndentClass(HtmlNode node, int level)
        {
            node.Attributes["class"]?.Value?.Replace(GetIndentClass(level), string.Empty);
        }
    }
}
