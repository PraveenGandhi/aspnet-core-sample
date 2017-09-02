/* Options:
Date: 2017-09-02 21:48:30
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
    id: number;
    requestIP: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
    mobileVerificationCode: string;
    mobileVerificationExpiryAt: string;
    isMobileVerified: boolean;
    emailVerificationCode: string;
    emailVerificationExpiryAt: string;
    isEmailVerified: boolean;
    fullName: string;
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    message: string;

    // @DataMember(Order=3)
    stackTrace: string;

    // @DataMember(Order=4)
    errors: ResponseError[];

    // @DataMember(Order=5)
    meta: { [index:string]: string; };
}

export class RegistrationResponse
{
    portalTempUser: PortalTempUser;
    responseStatus: ResponseStatus;
}

export class MobileVerificationResponse
{
    responseStatus: ResponseStatus;
    fullName: string;
}

export class SetPasswordResponse
{
    isDone: boolean;
    responseStatus: ResponseStatus;
}

export class Registration implements IReturn<RegistrationResponse>
{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createResponse() { return new RegistrationResponse(); }
    getTypeName() { return "Registration"; }
}

export class MobileVerification implements IReturn<MobileVerificationResponse>
{
    id: number;
    verificationCode: string;
    createResponse() { return new MobileVerificationResponse(); }
    getTypeName() { return "MobileVerification"; }
}

export class SetPassword implements IReturn<SetPasswordResponse>
{
    id: number;
    username: string;
    password: string;
    confirmPassword: string;
    createResponse() { return new SetPasswordResponse(); }
    getTypeName() { return "SetPassword"; }
}
