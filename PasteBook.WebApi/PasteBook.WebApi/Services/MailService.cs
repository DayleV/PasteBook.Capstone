using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using PasteBook.WebApi.Settings;
using PasteBook.WebApi.Models;
using System.Net.Mail;
using PasteBook.WebApi.DataObjectTransfer;

namespace PasteBook.WebApi.Services
{
    public class MailService : IMailService
    {
        private readonly MailSetting _mailSettings;
        public MailService(IOptions<MailSetting> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        public async Task SendEmailAsync(UserRegistration user)
        {

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(_mailSettings.Mail);
                mail.To.Add(user.EmailAddress);
                mail.Subject = "Email Confirmation";
                mail.Body = "Good Day!\n\nPlease Confirm your Account";
                mail.IsBodyHtml = true;

                using (SmtpClient smtpClient = new SmtpClient(_mailSettings.Host, _mailSettings.Port))
                {
                    smtpClient.Credentials = new System.Net.NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
                    smtpClient.EnableSsl = true;
                    smtpClient.Send(mail);
                }
            }
        }
    }
}
