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

        public async Task SendEmailAsync(string fromEmail, string subject, string body)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = subject,
                Body = $"From: {fromEmail}\n\n{body}",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(_toEmail);

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
