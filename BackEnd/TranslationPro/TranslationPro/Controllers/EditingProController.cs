using TranslationPro.BLL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TranslationPro.BLL.Services;

namespace TranslationPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditingProController : ControllerBase
    {
        IEditingProOrderService _editingProOrderService;
        ICompanyService _companyService;
        public EditingProController(IEditingProOrderService editingProOrderService,ICompanyService companyService)
        {
            _editingProOrderService = editingProOrderService;
            _companyService = companyService;
        }


        [HttpPost]
        public IActionResult SavePaymentInfo(CompanyModel model)
        {
            try
            {
                bool result = false;
                if (this.ModelState.IsValid)
                {
                    CompanyModel company = _companyService.CheckExistingCustomer(model.ClientID);
                    
                    if (company != null)
                    {
                        result = _companyService.RegisterCustomer(model);
                    }
                    

                    return Ok(result);
                }
                else
                {
                    return BadRequest();

                }
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
