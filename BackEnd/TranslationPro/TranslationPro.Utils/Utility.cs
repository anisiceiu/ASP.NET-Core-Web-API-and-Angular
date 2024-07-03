using System;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Web;

namespace TranslationPro.Utils
{
    public static class Utility
    {
        private static readonly Random random = new Random();
        private static readonly object syncLock = new object();

        public static string GetPaymentMethodNameFromID(PaymentMethod? PaymentMethodID)
        {
            string MethodName = string.Empty;
            if (PaymentMethodID.HasValue == false)
                return MethodName;
            switch (PaymentMethodID.Value)
            {
                case PaymentMethod.CreditCard_IPS:
                    MethodName = "Credit Card (IPS)";
                    break;
                case PaymentMethod.CreditCard_Stripe:
                    MethodName = "Credit Card (Stripe)";
                    break;
                case PaymentMethod.MonthlyPayment:
                    MethodName = "Monthly";
                    break;
                case PaymentMethod.RequestedPayment:
                    MethodName = "Requested Payment";
                    break;
                case PaymentMethod.PayPal:
                    MethodName = "PayPal";
                    break;
                case PaymentMethod.AliPay:
                    MethodName = "AliPay";
                    break;
                case PaymentMethod.Bank:
                    MethodName = "BankAccount";
                    break;
                case PaymentMethod.PostOffice:
                    MethodName = "PostOffice";
                    break;
                case PaymentMethod.Others:
                    MethodName = "Others";
                    break;
            }
            return MethodName;
        }

        public static string GenerateNewApplicationKey()
        {
            string AppKey, DateString;
            byte[] RandomByte, DateByte, CombinedByte;
            int index;
            byte value;
            Encoding Enc = Encoding.UTF8;                                                   // Use UTF-8 unicode encoder
            Random RndGenerator = new Random();                                             // User random bytes for half of the input

            DateString = DateTime.UtcNow.ToString();
            DateByte = Enc.GetBytes(DateString);
            RandomByte = new byte[DateByte.Length];
            RndGenerator.NextBytes(RandomByte);
            CombinedByte = new byte[DateByte.Length * 2];                                   // Length of combined bytes will be double
            for (index = 0; index < DateByte.Length * 2; index += 1)
            {
                value = index % 2 == 0 ? DateByte[index / 2] : RandomByte[index / 2];       // Switch the source of bytes on each turn
                CombinedByte[index] = value;
            }
            AppKey = Convert.ToBase64String(CombinedByte, Base64FormattingOptions.None);    // Single line base64 string
            return AppKey;
        }

        
        public static void SetDynamicPropertyValue(object item, string culture)
        {

            //Use reflection to get property
            PropertyInfo property;
            PropertyInfo[] properties = item.GetType().GetProperties();

            properties.ToList().ForEach(prop =>
           {
               if (null != prop && prop.CanWrite)
               {
                   if (prop.Name.Contains("Name") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Name");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("Description") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Description");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Address") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Address");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("AccountName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("AccountName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("NoteTitle") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("NoteTitle");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   else if (prop.Name.Contains("Note") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Note");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   else if (prop.Name.Contains("Title") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Title");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("HomeAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("HomeAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SelfIntroduction") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SelfIntroduction");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Coordinator") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Coordinator");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("VoiceDetail") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("VoiceDetail");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Comment") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Comment");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("DeliveryTypeName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("DeliveryTypeName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Address1") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Address1");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Address2") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Address2");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("FirstName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("FirstName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("LastName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("LastName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("OtherExperience") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("OtherExperience");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SelfPromotion") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SelfPromotion");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("MiddleName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("MiddleName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("CityOfOverseas") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CityOfOverseas");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("ApartmentName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("ApartmentName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("HomeCountryAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("HomeCountryAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Street") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Street");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("MainCareer") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("MainCareer");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SelfPR") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SelfPR");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("CityOfOverseas") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CityOfOverseas");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("Street") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Street");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("HomeCountryAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("HomeCountryAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("TownName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("TownName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("CompanyName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CompanyName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("CompanyPrivacyName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CompanyPrivacyName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("CompanyDetails") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CompanyDetails");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("OfficeLocation") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("OfficeLocation");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Position") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Position");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("JobResponsibility") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("JobResponsibility");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Achivements") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Achivements");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InterviewNote") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InterviewNote");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("ReasonOfResignation") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("ReasonOfResignation");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("CEOName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CEOName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("ServiceName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("ServiceName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InvoiceCompanyName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InvoiceCompanyName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InvoiceAddress1") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InvoiceAddress1");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InvoiceAddress2") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InvoiceAddress2");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InchagreName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InchagreName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("AddressedPersonName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("AddressedPersonName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("AccountHolderName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("AccountHolderName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Item") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Item");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Contents") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Contents");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Contents") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Contents");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Response") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Response");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SubTitle1") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SubTitle1");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SubTitle2") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SubTitle2");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SubTitle3") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SubTitle3");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("CustomerEvaluation") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CustomerEvaluation");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("OfferingPosition") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("OfferingPosition");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("EducationalBackground") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("EducationalBackground");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("JobHistory") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("JobHistory");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("ReasonForHRStock") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("ReasonForHRStock");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("SummaryOfResume") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("SummaryOfResume");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("CurrentState") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("CurrentState");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Content1") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Content1");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Content2") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Content2");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Content3") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Content3");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("NickName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("NickName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("DetailsNote") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("DetailsNote");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Prefecture") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Prefecture");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("InstituteName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("InstituteName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Department") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Department");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("ParmanentPrefecture") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("ParmanentPrefecture");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("Subject") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Subject");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("Body") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("Body");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }
                   if (prop.Name.Contains("BillingCompanyName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("BillingCompanyName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("AccountHolderAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("AccountHolderAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("BillingAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("BillingAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("DeliveryCompanyName") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("DeliveryCompanyName");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

                   if (prop.Name.Contains("DeliveryAddress") && prop.Name.Contains("_" + culture))
                   {
                       property = item.GetType().GetProperty("DeliveryAddress");
                       var value = property != null ? property.GetValue(item, null) : string.Empty;
                       prop.SetValue(item, value, null);
                   }

               }
           });

        }


        #region Manage Culture Dependent Property

        // OLD ONE
        public static object GetPropertyValue(object item, string property, string culture)
        {
            //Use reflection to get property value
            if (item != null)
            {
                PropertyInfo[] properties = item.GetType().GetProperties();
                object objValue = null;
                List<PropertyInfo> list = properties.ToList();
                foreach (PropertyInfo s in list)
                {
                    //if (s.Name.Contains(property) && s.Name.Contains("_" + culture))
                    //{
                    //    objValue = item.GetType().GetProperty(s.Name).GetValue(item, null);
                    //}
                    string fullproperty = property + "_" + culture;
                    if (s.Name.Equals(fullproperty) == true)
                    {
                        objValue = item.GetType().GetProperty(s.Name).GetValue(item, null);
                    }
                    else if (s.Name.Contains(property) && s.Name.Contains("_" + culture))
                    {
                        // objValue = item.GetType().GetProperty(s.Name).GetValue(item, null);
                    }
                }

                return objValue;

            }
            else {
                return null;
            }
            
            //foreach (var s in properties)
            //{
            //    if(s.Name.Contains(property) && s.Name.Contains("_" + culture)){
            //        objValue = item.GetType().GetProperty(s.Name).GetValue(item, null);
            //    }
            //}
            
        }

        public static List<T> SyncCultureDependentPropertyValue<T>(this List<T> itemList, string propertyList, string culture, bool cultureToNonCulture = true)
        {
            foreach (var item in itemList)
            {
                SyncCultureDependentPropertyValue(item, propertyList, culture, cultureToNonCulture);
            }

            return itemList;
        }

        public static T SyncCultureDependentPropertyValue<T>(this T item, string propertyList, string culture, bool cultureToNonCulture = true)
        {
            List<string> propertyStrings = propertyList.Split(',').ToList();
            foreach (var propertyString in propertyStrings)
            {
                var property = item.GetType().GetProperties().FirstOrDefault(p => p.Name.ToLower() == propertyString.Trim().ToLower());
                var propertyWithCulture = item.GetType().GetProperties().FirstOrDefault(p => p.Name.ToLower() == propertyString.Trim().ToLower() + "_" + culture.ToLower());
                if (property != null && propertyWithCulture != null)
                {
                    var propertyValue = property.GetValue(item, null);
                    var propertyWithCultureValue = propertyWithCulture.GetValue(item, null);

                    if (propertyValue == null && propertyWithCultureValue != null)
                    {
                        property.SetValue(item, propertyWithCultureValue, null);
                    }
                    else if (propertyValue != null && propertyWithCultureValue == null)
                    {
                        propertyWithCulture.SetValue(item, propertyValue, null);
                    }
                    else if (propertyValue != null && propertyWithCultureValue != null)
                    {
                        if (cultureToNonCulture)
                        {
                            property.SetValue(item, propertyWithCultureValue, null);
                        }
                        else
                        {
                            propertyWithCulture.SetValue(item, propertyValue, null);
                        }
                    }
                }
            }

            return item;
        }

        public static T SyncCultureValue<T>(this T item)
        {
            List<PropertyInfo> propertyList = new List<PropertyInfo>();

            propertyList.Add(item.GetType().GetProperties().FirstOrDefault(p => p.Name == "CurrentCulture"));
            propertyList.Add(item.GetType().GetProperties().FirstOrDefault(p => p.Name.ToLower() == "CultureID".ToLower()));

            int i = 0;
            object propertyValue = null;
            while (i < propertyList.Count)
            {
                propertyValue = propertyList[i].GetValue(item, null);
                if (propertyValue != null)
                    break;
                i++;
            }

            foreach (var property in propertyList)
            {
                if (property != null)
                {
                    property.SetValue(item, propertyValue, null);
                }
            }

            return item;
        }

        public static T GetPropertyValueTargetFromSource<T>(this T targetObject, string targetProperty, object sourceValueObject, string sourceValueProperty, string cultureCode)
        {
            PropertyInfo sourcePropWithoutCulture = targetObject.GetType().GetProperty(targetProperty.Trim());
            PropertyInfo destPropWithCulture = sourceValueObject.GetType().GetProperty(sourceValueProperty.Trim() + "_" + cultureCode.ToLower());
            if (sourcePropWithoutCulture != null && destPropWithCulture != null)
            {
                object targetValue = destPropWithCulture.GetValue(sourceValueObject);
                sourcePropWithoutCulture.SetValue(targetObject, targetValue);
            }
            return targetObject;
        }

        #endregion

        #region Encryption / Decryption Functions

        public static string EncryptText(string strText)
        {
            if (strText != null)
            {
                return Encrypt(strText, "&#?:*%@,");
            }
            else
            {
                return null;
            }
        }

        public static string DecryptCypher(string strText)
        {
            if (strText != null)
            {
                return Decrypt(strText, "&#?:*%@,");
            }
            else
            {
                return null;
            }
        }

        public static string Encrypt(string strText, string strEncrKey)
        {
            //------------------------------------------------------------------------
            //Encryption algorithm code
            //------------------------------------------------------------------------
            byte[] byKey = {

            };
            byte[] IV = {
                0x12,
                0x34,
                0x56,
                0x78,
                0x90,
                0xab,
                0xcd,
                0xef
            };

            try
            {
                byKey = System.Text.Encoding.UTF8.GetBytes(Microsoft.VisualBasic.Strings.Left(strEncrKey, 8));

                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                byte[] inputByteArray = Encoding.UTF8.GetBytes(strText);
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(byKey, IV), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                return Convert.ToBase64String(ms.ToArray());

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string Decrypt(string strText, string sDecrKey)
        {
            //------------------------------------------------------------------------
            //Decryption algorithm code
            //------------------------------------------------------------------------
            byte[] byKey = {

    };
            byte[] IV = {
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0xab,
        0xcd,
        0xef
    };
            byte[] inputByteArray = new byte[strText.Length + 1];

            strText = Microsoft.VisualBasic.Strings.Replace(strText, " ", "+");

            try
            {
                byKey = System.Text.Encoding.UTF8.GetBytes(Microsoft.VisualBasic.Strings.Left(sDecrKey, 8));
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                inputByteArray = Convert.FromBase64String(strText);
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(byKey, IV), CryptoStreamMode.Write);

                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                System.Text.Encoding encoding = System.Text.Encoding.UTF8;

                return encoding.GetString(ms.ToArray());

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        #endregion

        public static string MD5(string input)
        {
            string hashed;
            MD5CryptoServiceProvider x = new MD5CryptoServiceProvider();
            byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            System.Text.StringBuilder s = new System.Text.StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }
            hashed = s.ToString();
            return hashed;
        }
        public static byte[] EncodePasswordSha1OldTransproBytes(string password, string salt)
        {
            UTF8Encoding u8e = new UTF8Encoding();
            byte[] byteBuffer = u8e.GetBytes(salt + password);
            SHA1 sha = new SHA1CryptoServiceProvider();
            byte[] result = sha.ComputeHash(byteBuffer);
            return result;
        }

        public static string EncodePasswordSha1OldTranspro(string password, string salt)
        {
            UTF8Encoding utf8Encoding = new UTF8Encoding();
            byte[] byteBuffer = utf8Encoding.GetBytes(salt.Trim() + password.Trim());
            SHA1 sha = new SHA1CryptoServiceProvider();
            byte[] comHash = sha.ComputeHash(byteBuffer);
            return Encoding.Unicode.GetString(comHash);
        }

        public static string buildQueryString(Dictionary<string, string> queryDictionary)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            foreach (var item in queryDictionary)
            {
                query[item.Key] = item.Value;
            }
            return query.ToString();
        }

        public static string prepareURL(string baseURL, string ActionName, Dictionary<string, string> queryDictionary = null)
        {
            var builder = new UriBuilder(baseURL + ActionName);
            if (queryDictionary != null)
            {
                builder.Query = buildQueryString(queryDictionary);
            }
            return builder.ToString();
        }

        public static string EncrytionStringOld(string input)
        {
            byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);

            string encrptedString = Convert.ToBase64String(bs);

            return encrptedString;
        }

        public static string DecrytionStringOld(string encryptedInput)
        {
            string decrptedString;
            MD5CryptoServiceProvider x = new MD5CryptoServiceProvider();

            byte[] bytes = Convert.FromBase64String(encryptedInput);
            decrptedString = System.Text.Encoding.UTF8.GetString(bytes);

            return decrptedString;
        }

        public static string EncrytionString(string input)
        {
            byte[] saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            byte[] iputBytes = UTF8Encoding.UTF8.GetBytes(input);

            string encryptedString = string.Empty;
            using (AesManaged aes = new AesManaged())
            {
                InitializeAes(saltBytes, aes);

                using (ICryptoTransform encryptTransform = aes.CreateEncryptor())
                {
                    encryptedString = Convert.ToBase64String(Crypted(iputBytes, encryptTransform));
                }

            }

            return encryptedString;
        }

        public static string DecrytionString(string encryptedInput)
        {
            byte[] saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            byte[] iputBytes = Convert.FromBase64String(encryptedInput);

            string decryptedString = string.Empty;

            using (AesManaged aes = new AesManaged())
            {
                InitializeAes(saltBytes, aes);

                using (ICryptoTransform decryptTransform = aes.CreateDecryptor())
                {
                    byte[] decryptBytes = Crypted(iputBytes, decryptTransform);
                    decryptedString = UTF8Encoding.UTF8.GetString(decryptBytes, 0, decryptBytes.Length);
                }
            }
            return decryptedString;
        }

        private static byte[] Crypted(byte[] iputBytes, ICryptoTransform encryptTransform)
        {
            using (MemoryStream encryptedStream = new MemoryStream())
            {
                using (CryptoStream encryptor =
                new CryptoStream(encryptedStream, encryptTransform, CryptoStreamMode.Write))
                {
                    encryptor.Write(iputBytes, 0, iputBytes.Length);
                    encryptor.Flush();
                    encryptor.Close();
                    byte[] encryptBytes = encryptedStream.ToArray();
                    return encryptBytes;
                }

            }
        }

        private static void InitializeAes(byte[] saltBytes, AesManaged aes)
        {
            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes("1357", saltBytes);
            aes.BlockSize = aes.LegalBlockSizes[0].MaxSize;
            aes.KeySize = aes.LegalKeySizes[0].MaxSize;
            aes.Key = rfc.GetBytes(aes.KeySize / 8);
            aes.IV = rfc.GetBytes(aes.BlockSize / 8);
        }

        public static Guid Int2Guid(int value)
        {
            byte[] bytes = new byte[16];
            BitConverter.GetBytes(value).CopyTo(bytes, 0);
            return new Guid(bytes);
        }

        public static int Guid2Int(Guid value)
        {
            byte[] b = value.ToByteArray();
            int bint = BitConverter.ToInt32(b, 0);
            return bint;
        }


        public static string GenerateUserVerificationCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        public static string GenerateInvoiceNo(int index)
        {
            var currentDateTime = DateTime.Now;

            string year = currentDateTime.ToString("yy");
            string month = currentDateTime.ToString("MM");
            string day = currentDateTime.ToString("dd");

            string hour = currentDateTime.TimeOfDay.Hours.ToString().PadLeft(2, '0');
            string minute = currentDateTime.TimeOfDay.Minutes.ToString().PadLeft(2, '0');
            string serial = (index + 1).ToString().PadLeft(3, '0');

            var invoiceNo = year + month + day + hour + minute + serial;
            return invoiceNo;
        }

        public static string GenerateMerchantSecurityKey()
        {
            int length = 9;
            Random random = new Random();
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            string specialCharacters = "!@#$%*_+?:";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }

            result.Insert(random.Next(9), specialCharacters[random.Next(specialCharacters.Length)]);
            return result.ToString();
        }

        public static string GenerateInstitutionUserSecurityKey()
        {
            int length = 7;
            Random random = new Random();
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            string specialCharacters = "!@#$%*_+?:";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }

            result.Insert(random.Next(7), specialCharacters[random.Next(specialCharacters.Length)]);
            return result.ToString();
        }

        public static string GenerateMerchantCategoryCode()
        {
            lock (syncLock)
            {
                var randomPINResult = random.Next(0, 9999).ToString();
                return randomPINResult.PadLeft(4, '0');
            }
        }

        public static string GenerateMerchantCode()
        {
            lock (syncLock)
            {
                var randomPINResult = random.Next(0, 9999).ToString();
                return randomPINResult.PadLeft(4, '0');
            }
        }

        public static string GenerateTransactionId(string transactionType, string stan)
        {
            lock (syncLock)
            {
                char padLeft = Convert.ToChar(random.Next(1, 8).ToString());
                return transactionType + stan + random.Next(1, 99999999).ToString().PadLeft(8, padLeft);
            }
        }

        public static string GetRetrievalReferenceNumber(DateTime transactionDateTime, string stan)
        {
            var sbTransactionId = new StringBuilder();
            sbTransactionId.AppendFormat("{0}{1}{2}", transactionDateTime.ToString("yy").Last(), transactionDateTime.DayOfYear, transactionDateTime.ToString("HH"));
            sbTransactionId.Append(stan);
            return sbTransactionId.ToString();
        }

        //public static string GenerateEmailVerificationCode()
        //{
        //    lock (syncLock)
        //    {
        //        var randomPINResult = random.Next(0, 999999).ToString();
        //        return randomPINResult.PadLeft(6, '0');
        //    }
        //}

        //public static string GenerateReferralCode()
        //{
        //    lock (syncLock)
        //    {
        //        var randomPINResult = random.Next(0, 999999).ToString();
        //        return randomPINResult.PadLeft(6, '0');
        //    }
        //}

        //public static string GenerateMobileNumberVerificationCode()
        //{
        //    lock (syncLock)
        //    {
        //        var randomPINResult = random.Next(0, 999999).ToString();
        //        return randomPINResult.PadLeft(6, '0');
        //    }
        //}

        public static string GenerateOTP(int length)
        {
            lock (syncLock)
            {
                string _numbers = "0123456789";
                Random random = new Random();
                StringBuilder builder = new StringBuilder(6);

                for (var i = 0; i < length; i++)
                {
                    builder.Append(_numbers[random.Next(0, _numbers.Length)]);
                }
                return builder.ToString();

                //var randomPINResult = random.Next(0, 9999).ToString();
                //return randomPINResult.PadLeft(4, '0');
            }
        }

        public static string GenerateCardNumber()
        {
            int length = 12;
            Random random = new Random();
            string characters = "0123456789";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }
            return result.ToString();
        }

        public static DateTime PasswordChangeVerificationCodeExpiryDate()
        {
            return DateTime.UtcNow.AddMinutes(30);
        }

        public static string GenerateDNCPassword()
        {
            return "123456";
        }

        public static string GenerateETHPassword(string account)
        {
            return "123456";
        }

        public static string CreateDirectory(string UploadPath)
        {
            string status = "Success";


            var fileInfo = new System.IO.FileInfo(UploadPath);
            if (!fileInfo.Directory.Exists)
            {
                fileInfo.Directory.Create();
            }
            return status;
        }

        public static void ClearFolder(string FolderName)
        {
            DirectoryInfo dir = new DirectoryInfo(FolderName);

            foreach (FileInfo fi in dir.GetFiles())
            {
                fi.Delete();
            }

            foreach (DirectoryInfo di in dir.GetDirectories())
            {
                ClearFolder(di.FullName);
                di.Delete();
            }
        }

        public static DateTime ConvertToUtc(DateTime dateTime)
        {
            switch (dateTime.Kind)
            {
                case DateTimeKind.Unspecified:
                    return DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
                case DateTimeKind.Local:
                    return dateTime.ToUniversalTime();
                default:
                    return dateTime;
            }
        }

        public static DateTime ToUTCtDateTime(this long unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp);
            return dtDateTime;
        }

        public static string DeepestExceptionMessage(this Exception exception)
        {
            string message;
            while (exception.InnerException != null)
            {
                exception = exception.InnerException;
            }
            message = exception.Message;
            return message;
        }

        private static int GetCharsInRange(string text, int min, int max)
        {
            List<char> lst = new List<char>(text.ToCharArray());
            return lst.FindAll(e => e >= min && e <= max).Count;
        }

        public static bool IsJapaneseText(string input)
        {
            if(!string.IsNullOrEmpty(input))
            {
                int hiragana = GetCharsInRange(input, 0x3040, 0x309F);
                int katakana = GetCharsInRange(input, 0x30A0, 0x30FF);
                int result = hiragana + katakana;
                return result > 0;
            }
            else
            {
                return false;
            }
          
        }

        public static List<SelectedItem> RegPurposeType = new List<SelectedItem>
            {
            new SelectedItem() {Id=1,Name_en="registered by client",Name_cn="由客户注册",Name_fr="Enregistré par le client",Name_jp="クライアント登録",Name_kr="고객이 등록한",Name_tl="ลงทะเบียนโดยลูกค้า" },
            new SelectedItem() {Id=2,Name_en="Temporally Registration",Name_cn="Temporally Registration",Name_fr="Temporally Registration",Name_jp="仮登録",Name_kr="가등록" ,Name_tl="Temporally Registration"},
            new SelectedItem() {Id=3,Name_en="registered by b-cause (for sales)", Name_cn="由b-cause（销售）注册", Name_fr="Enregistré par b-cause (pour les ventes)", Name_jp="b-causeによって登録された（販売用）", Name_kr="b-cause에 의해 등록 (판매용)",Name_tl="จดทะเบียนโดย b-cause (สำหรับการขาย)" }
            };

        public static List<SelectedItem> ClientLocationType = new List<SelectedItem>
            {
            new SelectedItem() {Id=1,Name_en="Local", Name_cn="本地",Name_fr="Local",Name_jp="地元", Name_kr="국내", Name_tl="ในประเทศ" },
            new SelectedItem() {Id=2,Name_en="overseas", Name_cn="海外", Name_fr="étranger", Name_jp="海外",Name_kr="해외", Name_tl="ต่างประเทศ" }
            };

        public static List<SelectedItem> CompanyType = new List<SelectedItem>
            {
            //new SelectedItem() {Id=1,Name_en="Corporate", Name_cn="企业", Name_fr="Entreprise", Name_jp="コーポレート", Name_kr="기업", Name_tl="ขององค์กร" },
            //new SelectedItem() {Id=2,Name_en="Individuals", Name_cn="个人", Name_fr="Personnes", Name_jp="個人", Name_kr="개인", Name_tl="บุคคล" }
            new SelectedItem() {Id=1,Name_en="Human resource agent", Name_cn="人力资源代理", Name_fr="Human resource agent", Name_jp="人材エージェント", Name_kr="채용 에이전트", Name_tl="Human resource agent" },
            new SelectedItem() {Id=2,Name_en="Human resource corporate", Name_cn="人力资源公司", Name_fr="Human resource corporate", Name_jp="人材コーポレート", Name_kr="인재서비스 회사", Name_tl="Human resource corporate" },
            new SelectedItem() {Id=3,Name_en="Translation Company", Name_cn="笔译/口译公司", Name_fr="Translation Company", Name_jp="翻訳・通訳会社", Name_kr="번역회사", Name_tl="Translation Company" },
            new SelectedItem() {Id=4,Name_en="Manufacturer", Name_cn="生产厂家/一般企业", Name_fr="Manufacturer", Name_jp="メーカー・一般企業", Name_kr="제조업", Name_tl="Manufacturer" },
            new SelectedItem() {Id=5,Name_en="Print/Design", Name_cn="打印/设计公司", Name_fr="Print&Design", Name_jp="印刷・デザイン会社", Name_kr="인쇄 / 디자인", Name_tl="Print&Design" },
            new SelectedItem() {Id=6,Name_en="IT/Software/SEO", Name_cn="IT /软件开发/ SEO等等", Name_fr="IT/Software/SEO", Name_jp="IT・ソフト開発・SEOなど", Name_kr="IT/소프트웨어/SEO", Name_tl="IT/Software/SEO" },
            new SelectedItem() {Id=7,Name_en="NPO/Public offices/schools", Name_cn="NPO /政府/学校", Name_fr="NPO/Public offices/schools", Name_jp="NPO・役所・学校", Name_kr="NPO/공공기관/학교", Name_tl="NPO/Public offices/schools" },
            new SelectedItem() {Id=8,Name_en="Private/GlobalCompany", Name_cn="私人/海外企业", Name_fr="Private/GlobalCompany", Name_jp="個人・海外企業", Name_kr="사기업/글로벌기업", Name_tl="Private/GlobalCompany" },
            new SelectedItem() {Id=9,Name_en="Mass Communication", Name_cn="大众传播", Name_fr="Mass Communication", Name_jp="マスコミ", Name_kr="매스미디어", Name_tl="Mass Communication" }
        };


        public static List<SelectedItem> TradingOfficeList = new List<SelectedItem>
                {
                 new SelectedItem() {Id=4,Name_en="Japan", Name_cn="日本", Name_fr="Japon", Name_jp="日本", Name_kr="일본", Name_tl="ประเทศญี่ปุ่น" },
                 new SelectedItem() {Id=2,Name_en="Korea", Name_cn="韩国", Name_fr="Corée", Name_jp="韓国", Name_kr="대한민국", Name_tl="เกาหลี" },
                 new SelectedItem() {Id=12,Name_en="Philipines", Name_cn="菲律宾", Name_fr="Philippines", Name_jp="フィリピン", Name_kr="필리핀", Name_tl="ฟิลิปปินส์" },
                 new SelectedItem() {Id=11,Name_en="Bangladesh", Name_cn="孟加拉国", Name_fr="Bangladesh", Name_jp="バングラデシュ", Name_kr="방글라데시", Name_tl="บังคลาเทศ" }
                };

        public static List<SelectedItem> ActivityType = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Arranging appointment(PhoneCall/e-mail)", Name_cn="安排约会（电话号码/电子邮件）", Name_fr="Organisation du rendez-vous (PhoneCall / e-mail)", Name_jp="予約の手配（PhoneCall / Eメール）", Name_kr="약속 정렬 (PhoneCall / 전자 메일)", Name_tl="นัดหมาย (PhoneCall / e-mail)" },
            new SelectedItem() {Id=2,Name_en="Meeting", Name_cn="会议", Name_fr="Réunion", Name_jp="会議", Name_kr="모임", Name_tl="การประชุม" },
            new SelectedItem() {Id=2,Name_en="Sales Appointment", Name_cn="销售预约", Name_fr="Rendez-vous de vente", Name_jp="セールスアポイントメント", Name_kr="판매 약속", Name_tl="นัดหมายการขาย" },
            new SelectedItem() {Id=2,Name_en="Handling Claim", Name_cn="处理索赔", Name_fr="Traitement de la réclamation", Name_jp="クレームの取扱い", Name_kr="손해 배상 청구 처리", Name_tl="การจัดการการอ้างสิทธิ์" }
        };

        public static List<SelectedItem> ResultofActivity = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Failed (Absent)", Name_cn="失败（缺席）", Name_fr="Échec (Absent)", Name_jp="失敗（不在）", Name_kr="실패 (부재)", Name_tl="ล้มเหลว (ขาด)" },
            new SelectedItem() {Id=2,Name_en="Failed (Refused)", Name_cn="失败（拒绝）", Name_fr="Échec (Refusé)", Name_jp="失敗（拒否", Name_kr="실패 (거부 됨)", Name_tl="ล้มเหลว (ปฏิเสธ)"},
            new SelectedItem() {Id=3,Name_en="Failed (No Interest)", Name_cn="失败（无兴趣）", Name_fr="Échec (aucun intérêt)", Name_jp="失敗（興味なし）", Name_kr="실패 (관심 없음)", Name_tl="ล้มเหลว (ไม่มีดอกเบี้ย)" },
            new SelectedItem() {Id=4,Name_en="On hold", Name_cn="等候接听", Name_fr="En attente", Name_jp="保留", Name_kr="보류 중", Name_tl="ระงับ" },
            new SelectedItem() {Id=5,Name_en="On hold（Positive)", Name_cn="暂停（正）", Name_fr="En attente (Positif)", Name_jp="保留中（ポジティブ）", Name_kr="보류 중 (긍정적)", Name_tl="ระงับ (บวก)" },
            new SelectedItem() {Id=6,Name_en="Succeed（Appoinment)", Name_cn="成功（的会面）", Name_fr="Réussir (nomination)", Name_jp="成功する（Appoinment）", Name_kr="성공 (Appoinment)", Name_tl="ประสบความสำเร็จ (แต่งตั้ง)" },
            new SelectedItem() {Id=7,Name_en="Succeed（Quotation)", Name_cn="成功（报价）", Name_fr="Réussir (Quotation)", Name_jp="成功する（見積もり）", Name_kr="성공 (견적)", Name_tl="ประสบความสำเร็จ (Quotation)" },
            new SelectedItem() {Id=8,Name_en="Succeed（expecting Order)", Name_cn="成功（期待订单）", Name_fr="Réussir (en attendant l'ordre)", Name_jp="成功する（注文を期待する）",Name_kr="성공 (주문 예상)", Name_tl="ประสบความสำเร็จ (คาดหวังว่าจะสั่งซื้อ)" },
            new SelectedItem() {Id=9,Name_en="Succeed（Ordered)", Name_cn="成功（有序）", Name_fr="Réussir (commandé)", Name_jp="成功（秩序ある）", Name_kr="성공 (Ordered)", Name_tl="ประสบความสำเร็จ (สั่ง)" },
            new SelectedItem() {Id=10,Name_en="Succeed（GainingTrust）", Name_cn="成功（GainingTrust）", Name_fr="Réussir (GainingTrust)", Name_jp="成功する（GainingTrust", Name_kr="성공 (GainingTrust)", Name_tl="ประสบความสำเร็จ (GainingTrust)" }
        };

        public static List<SelectedItem> AffiliateType = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Affiliate(promotion)", Name_cn="加盟（促销）", Name_fr="Affilié (promotion)", Name_jp="アフィリエイト（プロモーション）", Name_kr="제휴사 (프로모션)", Name_tl="พันธมิตร (โปรโมชั่น)" },
            new SelectedItem() {Id=2,Name_en="Post right", Name_cn="发贴权", Name_fr="Post right", Name_jp="投稿権", Name_kr="오른쪽부터", Name_tl="โพสต์ขวา" },
            new SelectedItem() {Id=3,Name_en="HR", Name_cn="HR", Name_fr="HEURE", Name_jp="HR", Name_kr="HR", Name_tl="ทรัพยากรบุคคล" },
            new SelectedItem() {Id=4,Name_en="Related company in overseas", Name_cn="相关公司在海外", Name_fr="Société associée à l'étranger", Name_jp="海外関連会社", Name_kr="해외 관련 회사", Name_tl="บริษัท ที่เกี่ยวข้องในต่างประเทศ" }
        };

        public static List<SelectedItem> PriceCalculateTypeList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Word", Name_cn="字", Name_fr="Mot", Name_jp="ワード", Name_kr="워드", Name_tl="คำ" },
            new SelectedItem() {Id=2,Name_en="Character",Name_cn="字符", Name_fr="Personnage", Name_jp="キャラクター", Name_kr="캐릭터",Name_tl="ตัวละคร"  },
            new SelectedItem() {Id=3,Name_en="Pages", Name_cn="网页", Name_fr="Pages", Name_jp="ページ", Name_kr="페이지", Name_tl="หน้า" }
        };

        public static List<SelectedItem> TranslationTypeLevel = new List<SelectedItem>
        {
            new SelectedItem()
            {
                Id =1,
                Name_en ="Documents which does not required special knowledge or skill for translation, will be ordered as Light level translation.We recommend you to start working from translation orders in Light level, get some evaluation and trust from our client,then try for the Business and Expert level translation works.",
                Name_jp ="Lightレベルは、個人的な手紙、メールなどビジネス要素は含まない内容が多いです。Lightレベルの翻訳実績を作りお客さんの信頼を得てから、翻訳料が高いBusiness、Expertの案件をおすすめします",
                Name_cn ="Documents which does not required special knowledge or skill for translation, will be ordered as Light level translation.We recommend you to start working from translation orders in Light level, get some evaluation and trust from our client,then try for the Business and Expert level translation works."
            },
            new SelectedItem()
            {
                Id=2,
                Name_en ="In Business level translation, some special knowledge and skill will be required for translation.We request you to communicate with client and meet their requirement for translation.",
                Name_jp ="Businessレベルは、ビジネスの現場で使用される内容で、少し専門的な内容も含まれます。依頼者の希望をくみ取って翻訳作業を行ってください。",
                Name_cn ="In Business level translation, some special knowledge and skill will be required for translation.We request you to communicate with client and meet their requirement for translation."
            },
            new SelectedItem()
            {
                Id=3,
                Name_en ="Special knowledge and experience is required for Expert level translation. We should provide qualified, perfect translation to our customer. (We are giving this offer only for the certified professional translators.)",
                Name_jp ="Expertレベルは、洗練された翻訳技術を要するもので、お客様には最高品質を保証するサービスとなります。（翻訳プロ(trans-Pro.)でも選ばれたかたのみご案内をしています）",
                Name_cn ="Special knowledge and experience is required for Expert level translation. We should provide qualified, perfect translation to our customer. (We are giving this offer only for the certified professional translators.)"
            }
        };

        public static List<SelectedItem> TransProAdminEmailList = new List<SelectedItem>
        {
            new SelectedItem()
            {
                Id =1,
                Name_en ="info@trans-pro.com.au",
                Name_jp ="info@trans-pro.net",
                Name_cn ="info@trans-pro.cn",
                Name_kr ="info@trans-pro.kr"
            }
        };

        public static List<SelectedItem> PaymentWayList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Credit Card", Name_cn="信用卡", Name_fr="Carte de crédit", Name_jp="クレジットカード", Name_kr="신용 카드", Name_tl="บัตรเครดิต" },
            new SelectedItem() {Id=2,Name_en="Bank", Name_cn="银行",Name_fr="Banque", Name_jp="バンク", Name_kr="은행", Name_tl="ธนาคาร" },
            new SelectedItem() {Id=3,Name_en="Paypal", Name_cn="贝宝", Name_fr="Pay Pal", Name_jp="ペイパル", Name_kr="페이팔", Name_tl="เพย์พาล" }
        };

        public static List<SelectedItem> NativeCheckCultureName = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Native Check", Name_cn="母语国人士检查", Name_fr="Native Check", Name_jp="ネイティブチェック", Name_kr="원어민 감수", Name_tl="Native Check" },
        };

        public static List<SelectedItem> LanguageLevelList = new List<SelectedItem>
        {
            new SelectedItem() {Id=5,Name_en="Native Level", Name_cn="母语水平", Name_fr="Niveau natif", Name_jp="ネイティブ並み ", Name_kr="원어민 수준", Name_tl="ระดับพื้นเมือง" },
            new SelectedItem() {Id=4,Name_en="Business Level", Name_cn="商务水平", Name_fr="Niveau d'affaires", Name_jp="ビジネスレベル ", Name_kr="비즈니스 수준", Name_tl="ขั้นพื้นฐาน" },
            new SelectedItem() {Id=3,Name_en="Daily Conversation", Name_cn="每日对话",Name_fr="Conversation quotidienne", Name_jp="日常会話レベル", Name_kr="일상 회화 수준", Name_tl="การสนทนารายวัน" },
            new SelectedItem() {Id=2,Name_en="Poor", Name_cn="较差的", Name_fr="Pauvre", Name_jp="片言レベル", Name_kr="초급", Name_tl="น่าสงสาร" },
            new SelectedItem() {Id=1,Name_en="Not required", Name_cn="不需要",Name_fr="Non requis", Name_jp="なし", Name_kr="해당사항없음", Name_tl="ไม่จำเป็นต้องใช้" } //Name_jp="不問", 
        };

        public static List<SelectedItem> NoticeStatusList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Show", Name_cn="显示", Name_fr="Montrer", Name_jp="ショー", Name_kr="보여 주다", Name_tl="แสดง" },
            new SelectedItem() {Id=2,Name_en="Hide", Name_cn="隐藏",Name_fr="Cacher", Name_jp="隠す", Name_kr="숨는 장소", Name_tl="ปิดบัง" },
            new SelectedItem() {Id=3,Name_en="ShowAfterLogin", Name_cn="登录后显示", Name_fr="Afficher après la connexion", Name_jp="ログイン後に表示", Name_kr="로그인 후 표시", Name_tl="แสดงหลังจากเข้าสู่ระบบ" },
        };

        public static List<SelectedItem> NoticePriorityList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="General", Name_cn="一般", Name_fr="Général", Name_jp="一般", Name_kr="일반", Name_tl="ทั่วไป" },
            new SelectedItem() {Id=2,Name_en="Important", Name_cn="重要",Name_fr="Important", Name_jp="重要", Name_kr="중대한", Name_tl="สำคัญ" },
        };

        public static List<SelectedItem> AdvertisementTypeList = new List<SelectedItem>
        {
            new SelectedItem() {Id=0,Name_en="Common/General", Name_cn="共同/一般", Name_fr="Commun/Général", Name_jp="一般/一般", Name_kr="공유지/일반", Name_tl="ร่วมกัน/ทั่วไป" },
            new SelectedItem() {Id=1,Name_en="Client", Name_cn="客户",Name_fr="Client", Name_jp="クライアント", Name_kr="고객", Name_tl="ไคลเอนต์" },
            new SelectedItem() {Id=2,Name_en="Staff", Name_cn="员工",Name_fr="Personnel", Name_jp="スタッフ", Name_kr="직원", Name_tl="บุคลากร" },
        };

        public static List<SelectedItem> CompanyTransproTypeList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="None", Name_cn="没有", Name_fr="Aucun", Name_jp="なし", Name_kr="없음", Name_tl="ไม่มี" },
            new SelectedItem() {Id=2,Name_en="OEM", Name_cn="OEM",Name_fr="", Name_jp="", Name_kr="", Name_tl="" },
            new SelectedItem() {Id=3,Name_en="Partially OEM", Name_cn="",Name_fr="", Name_jp="", Name_kr="", Name_tl="" },
            new SelectedItem() {Id=4,Name_en="Branch", Name_cn="科",Name_fr="Branche", Name_jp="ブランチ", Name_kr="분기", Name_tl="สาขา" },
            new SelectedItem() {Id=4,Name_en="Head office", Name_cn="总部",Name_fr="", Name_jp="", Name_kr="본점", Name_tl="" }
        };

        public static List<SelectedItem> PenaltyCategoryList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Abandonment", Name_cn="放弃",Name_fr="", Name_jp="", Name_kr="", Name_tl="" },
            new SelectedItem() {Id=2,Name_en="Late delivery ", Name_cn="延迟交稿",Name_fr="", Name_jp="", Name_kr="", Name_tl="" },
            new SelectedItem() {Id=3,Name_en="Mistake", Name_cn="没有", Name_fr="Aucun", Name_jp="なし", Name_kr="없음", Name_tl="ไม่มี" },
            new SelectedItem() {Id=4,Name_en="Untranslation", Name_cn="没有", Name_fr="Aucun", Name_jp="なし", Name_kr="없음", Name_tl="ไม่มี" },
        };

        public static List<SelectedItem> WorkingArrangementList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Full time", Name_cn="全职", Name_fr="À plein temps", Name_jp="フルタイム", Name_kr="풀 타임", Name_tl="เต็มเวลา" },
            new SelectedItem() {Id=2,Name_en="Part time", Name_cn="兼职",Name_fr="À temps partiel", Name_jp="パートタイム", Name_kr="파트 타임", Name_tl="ไม่เต็มเวลา" },
            new SelectedItem() {Id=3,Name_en="Contractual", Name_cn="合同",Name_fr="Contractuel", Name_jp="契約上の", Name_kr="계약 적", Name_tl="ตามสัญญา" },
            new SelectedItem() {Id=4,Name_en="Dispatch", Name_cn="派遣", Name_fr="Envoi", Name_jp="ディスパッチ", Name_kr="급파", Name_tl="ฆ่า" },
            new SelectedItem() {Id=5,Name_en="Intern", Name_cn="实习生", Name_fr="Interne", Name_jp="インターン", Name_kr="인턴", Name_tl="แพทย์ฝึกหัด" },
            new SelectedItem() {Id=6,Name_en="Others", Name_cn="其他", Name_fr="Autres", Name_jp="その他", Name_kr="기타", Name_tl="ไม่มี" },
        };

        public static List<SelectedItem> EstimationStatusList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en="Under_estimation", Name_cn="正在报价", Name_fr="", Name_jp="見積準備中", Name_kr="견적 중", Name_tl="" },
            new SelectedItem() {Id=2,Name_en="Waiting_for_approval", Name_cn="等待批准", Name_fr="", Name_jp="社内承認待ち", Name_kr="수주 대기", Name_tl="" },
            new SelectedItem() {Id=3,Name_en="Approved", Name_cn="已批准", Name_fr="", Name_jp="社内承認済み", Name_kr="승인", Name_tl="" },
            new SelectedItem() {Id=4,Name_en="Waiting_for_confirmation", Name_cn="等待确认", Name_fr="", Name_jp="回答待ち", Name_kr="확정 대기", Name_tl="" },
            new SelectedItem() {Id=5,Name_en="Ordered", Name_cn="已下单", Name_fr="", Name_jp="受注", Name_kr="주문 완료", Name_tl="" },
            new SelectedItem() {Id=6,Name_en="Under_arrangement", Name_cn="正在安排", Name_fr="", Name_jp="手配中", Name_kr="준비 중", Name_tl="" },
            new SelectedItem() {Id=7,Name_en="In_progress", Name_cn="进行中", Name_fr="", Name_jp="進行中", Name_kr="진행 중", Name_tl="" },
            new SelectedItem() {Id=8,Name_en="Delivered", Name_cn="已交稿", Name_fr="", Name_jp="納品済", Name_kr="납품 완료", Name_tl="" },
            new SelectedItem() {Id=9,Name_en="Invoice_completed", Name_cn="已开发票", Name_fr="", Name_jp="請求済", Name_kr="송장 완료", Name_tl="" },
            new SelectedItem() {Id=10,Name_en="Waiting_for_deposit", Name_cn="等待保证金", Name_fr="", Name_jp="入金待ち", Name_kr="입금 대기", Name_tl="" },
            new SelectedItem() {Id=11,Name_en="Not_deposited", Name_cn="未付（保证金）", Name_fr="", Name_jp="未入金", Name_kr="입금 미완료", Name_tl="" },
            new SelectedItem() {Id=12,Name_en="Order_Completed", Name_cn="订单已完成", Name_fr="", Name_jp="案件終了", Name_kr="주문 완료", Name_tl="" },
            new SelectedItem() {Id=13,Name_en="Complaint", Name_cn="投诉", Name_fr="", Name_jp="クレーム", Name_kr="컴플레인", Name_tl="" },
            new SelectedItem() {Id=14,Name_en="Cancel", Name_cn="取消", Name_fr="", Name_jp="終了", Name_kr="취소", Name_tl="" },
            new SelectedItem() {Id=15,Name_en="Deleted", Name_cn="已删除", Name_fr="", Name_jp="削除", Name_kr="삭제", Name_tl="" },
        };

        public static List<SelectedItem> ResponsStatusList = new List<SelectedItem>
        {
            new SelectedItem() {Id=1,Name_en= "Change Quotation", Name_jp= "見積変更", Name_cn="更改报价", Name_fr="Change Quotation", Name_kr= "견적 변경", Name_tl= "Change Quotation" },
            new SelectedItem() {Id=2,Name_en= "Sending Email", Name_jp= "メール送信", Name_cn= "发送邮件", Name_fr= "Change Quotation", Name_kr= "이메일 송신", Name_tl= "Change Quotation"},
            new SelectedItem() {Id=3,Name_en= "Cancel Quotation", Name_jp= "キャンセル", Name_cn= "取消报价", Name_fr= "Change Quotation", Name_kr= "견적 취소", Name_tl= "Change Quotation" },
            new SelectedItem() {Id=4,Name_en= "Waiting for Manuscript", Name_jp= "原稿待ち", Name_cn= "Waiting for Manuscript", Name_fr= "Waiting for Manuscript", Name_kr= "Waiting for Manuscript", Name_tl= "Waiting for Manuscript" },
            new SelectedItem() {Id=5,Name_en= "Checking the Requirment", Name_jp= "やり方確認", Name_cn= "取消报价", Name_fr= "Checking the Requirment", Name_kr= "Checking the Requirment", Name_tl= "Checking the Requirment" },
            new SelectedItem() {Id=6,Name_en= "Didn't match", Name_jp= "条件が合わない", Name_cn= "Didn't match", Name_fr= "Didn't match", Name_kr= "Didn't match", Name_tl= "Didn't match" },
            new SelectedItem() {Id=7,Name_en= "Deal with other service", Name_jp= "他で対応", Name_cn= "Waiting for Internal Approval", Name_fr= "Waiting for Internal Approval", Name_kr= "Waiting for Internal Approval", Name_tl= "Waiting for Internal Approval" },
        };

    }

    public class SelectedItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Name_en { get; set; }
        public string Name_jp { get; set; }
        public string Name_kr { get; set; }
        public string Name_fr { get; set; }
        public string Name_cn { get; set; }
        public string Name_tl { get; set; }
    }

    public static class EnumHelper
    {
        /// <summary>
        /// Retrieve the description on the enum, e.g.
        /// [Description("Bright Pink")]
        /// BrightPink = 2,
        /// Then when you pass in the enum, it will retrieve the description
        /// </summary>
        /// <param name="en">The Enumeration</param>
        /// <returns>A string representing the friendly name</returns>
        public static string GetDescription(Enum en)
        {
            Type type = en.GetType();

            MemberInfo[] memInfo = type.GetMember(en.ToString());

            if (memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return en.ToString();
        }

        public static T ParseEnum<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static T ToEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }


}
