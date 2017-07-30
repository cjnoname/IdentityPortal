﻿
using System.ComponentModel;

namespace UmbracoChallenge.Enums
{
    public enum DocumentType
    {
        [Description("License")]
        License,

        [Description("Australian Passport")]
        AustralianPassport,

        [Description("Foreign Passport")]
        ForeignPassport,

        [Description("Utility Bill")]
        UtilityBill,

        [Description("Rent Receipt")]
        RentReceipt
    }
}