using AutoMapper;
using TranslationPro.BLL.Models;
using TranslationPro.DAL;

namespace TranslationPro.BLL.Mapping
{
    public partial class ModelMappingProfile : Profile
    {
        public ModelMappingProfile()
        {
            CreateMap<EditingChargeSetting,EditingChargeSettingModel>().ReverseMap();
            CreateMap<EditingPreference, EditingPreferenceModel>().ReverseMap();
            CreateMap<EditorCertificationInfo, EditorCertificationInfoModel>().ReverseMap();
            CreateMap<EditorPaymentSetting, EditorPaymentSettingModel>().ReverseMap();
        }
    }
}

