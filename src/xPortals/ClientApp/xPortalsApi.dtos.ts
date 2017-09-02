/* Options:
Date: 2017-09-02 19:01:49
Version: 1.043
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:28600

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturnVoid
{
    createResponse() : void;
}

export interface IReturn<T>
{
    createResponse() : T;
}

export class PortalTempUser
{
    Id: number;
    RequestIP: string;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    PhoneNumber: string;
    Email: string;
    MobileVerificationCode: string;
    MobileVerificationExpiryAt: string;
    IsMobileVerified: boolean;
    EmailVerificationCode: string;
    EmailVerificationExpiryAt: string;
    IsEmailVerified: boolean;
    FullName: string;
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    ErrorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    FieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    Message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    Meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    ErrorCode: string;

    // @DataMember(Order=2)
    Message: string;

    // @DataMember(Order=3)
    StackTrace: string;

    // @DataMember(Order=4)
    Errors: ResponseError[];

    // @DataMember(Order=5)
    Meta: { [index:string]: string; };
}

export class WithStatus
{
    ResponseStatus: ResponseStatus;
}

export class RegistrationResponse extends WithStatus
{
    PortalTempUser: PortalTempUser;
}

export class MobileVerificationResponse extends WithStatus
{
    FullName: string;
}

export class Registration implements IReturn<RegistrationResponse>
{
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    createResponse() { return new RegistrationResponse(); }
    getTypeName() { return "Registration"; }
}

export class MobileVerification implements IReturn<MobileVerificationResponse>
{
    Id: number;
    VerificationCode: string;
    createResponse() { return new MobileVerificationResponse(); }
    getTypeName() { return "MobileVerification"; }
}

export class SetPassword implements IReturn<boolean>
{
    Id: number;
    Username: string;
    Password: string;
    ConfirmPassword: string;
    createResponse() { return false; }
    getTypeName() { return "SetPassword"; }
}
