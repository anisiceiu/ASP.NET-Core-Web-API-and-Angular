using TranslationPro.BLL.Models;
using TranslationPro.DAL;
using TranslationPro.DAL.Repositories;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Net.Mail;
using Stripe;

namespace TranslationPro.BLL.Services
{
    public interface ICompanyService
    {
        bool SaveStripePaymentinfo(string chargeId, OrderModel ordermodel, string status);
        CompanyModel CheckExistingCustomer(int ClientID);


    }
    public class CompanyService : ICompanyService
    {
        private IOrderRepository _orderRepository;

        public EditingProOrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public CompanyModel CheckExistingCustomer(int ClientID)
        {
            
            throw new NotImplementedException();
        }

        public bool SaveStripePaymentinfo(string chargeId,OrderModel ordermodel,string status)
        {
            try
            {
                
                StripePaymentInfo paymentInfo = new StripePaymentInfo();
                paymentInfo.ApplicationID = ordermodel.ApplicationId == 0 ? 3 : Convert.ToInt32(ordermodel.ApplicationId);
                paymentInfo.IsLiveMode = true;
                paymentInfo.OrderID = ordermodel.ID;
                paymentInfo.OrderNo = ordermodel.OrderNo;
                paymentInfo.StripeChargeId = chargeId;
                paymentInfo.TransactionStatus = status;
                paymentInfo.TransactionType = "Charge";
                paymentInfo.CreatedDate = DateTime.UtcNow;
                _orderRepository.SaveStripePaymentInfoes(paymentInfo);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
