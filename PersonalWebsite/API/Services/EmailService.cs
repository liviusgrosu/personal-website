using System.Net;
using System.Net.Mail;

namespace API.Services
{
    public class EmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _toEmail;

        public EmailService(IConfiguration configuration)
        {
            var smtpSettings = configuration.GetSection("SmtpSettings");
            _smtpClient = new SmtpClient(smtpSettings["Host"])
            {
                Port = int.Parse(smtpSettings["Port"]),
                Credentials = new NetworkCredential(smtpSettings["Username"], smtpSettings["Password"]),
                EnableSsl = true,
            };
            _toEmail = smtpSettings["ToEmail"];
        }

        public async Task SendEmailAsync(string name, string email, string body)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(email),
                Subject = $"Livius Grosu Site - Message from: {name}",
                Body = $"From: {email}\n\n{body}",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(_toEmail);

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
