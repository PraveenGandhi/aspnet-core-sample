/* Options:
Date: 2017-09-03 16:34:03
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

// @DataContract
export class UserApiKey
{
    // @DataMember(Order=1)
    key: string;

    // @DataMember(Order=2)
    keyType: string;

    // @DataMember(Order=3)
    expiryDate: string;
}

export class RegistrationResponse
{
    portalTempUser: PortalTempUser;
    responseStatus: ResponseStatus;
}

export class MobileVerificationResponse
{
    fullName: string;
    responseStatus: ResponseStatus;
}

export class SetPasswordResponse
{
    isDone: boolean;
    responseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse
{
    // @DataMember(Order=1)
    userId: string;

    // @DataMember(Order=2)
    sessionId: string;

    // @DataMember(Order=3)
    userName: string;

    // @DataMember(Order=4)
    displayName: string;

    // @DataMember(Order=5)
    referrerUrl: string;

    // @DataMember(Order=6)
    bearerToken: string;

    // @DataMember(Order=7)
    refreshToken: string;

    // @DataMember(Order=8)
    responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class ConvertSessionToTokenResponse
{
    // @DataMember(Order=1)
    meta: { [index:string]: string; };

    // @DataMember(Order=2)
    responseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse
{
    // @DataMember(Order=1)
    accessToken: string;

    // @DataMember(Order=2)
    responseStatus: ResponseStatus;
}

// @DataContract
export class GetApiKeysResponse
{
    // @DataMember(Order=1)
    results: UserApiKey[];

    // @DataMember(Order=2)
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

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>
{
    // @DataMember(Order=1)
    provider: string;

    // @DataMember(Order=2)
    state: string;

    // @DataMember(Order=3)
    oauth_token: string;

    // @DataMember(Order=4)
    oauth_verifier: string;

    // @DataMember(Order=5)
    userName: string;

    // @DataMember(Order=6)
    password: string;

    // @DataMember(Order=7)
    rememberMe: boolean;

    // @DataMember(Order=8)
    continue: string;

    // @DataMember(Order=9)
    nonce: string;

    // @DataMember(Order=10)
    uri: string;

    // @DataMember(Order=11)
    response: string;

    // @DataMember(Order=12)
    qop: string;

    // @DataMember(Order=13)
    nc: string;

    // @DataMember(Order=14)
    cnonce: string;

    // @DataMember(Order=15)
    useTokenCookie: boolean;

    // @DataMember(Order=16)
    accessToken: string;

    // @DataMember(Order=17)
    accessTokenSecret: string;

    // @DataMember(Order=18)
    meta: { [index:string]: string; };
    createResponse() { return new AuthenticateResponse(); }
    getTypeName() { return "Authenticate"; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new AssignRolesResponse(); }
    getTypeName() { return "AssignRoles"; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new UnAssignRolesResponse(); }
    getTypeName() { return "UnAssignRoles"; }
}

// @Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>
{
    // @DataMember(Order=1)
    preserveSession: boolean;
    createResponse() { return new ConvertSessionToTokenResponse(); }
    getTypeName() { return "ConvertSessionToToken"; }
}

// @Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>
{
    // @DataMember(Order=1)
    refreshToken: string;
    createResponse() { return new GetAccessTokenResponse(); }
    getTypeName() { return "GetAccessToken"; }
}

// @Route("/apikeys")
// @Route("/apikeys/{Environment}")
// @DataContract
export class GetApiKeys implements IReturn<GetApiKeysResponse>
{
    // @DataMember(Order=1)
    environment: string;
    createResponse() { return new GetApiKeysResponse(); }
    getTypeName() { return "GetApiKeys"; }
}

// @Route("/apikeys/regenerate")
// @Route("/apikeys/regenerate/{Environment}")
// @DataContract
export class RegenerateApiKeys implements IReturn<GetApiKeysResponse>
{
    // @DataMember(Order=1)
    environment: string;
    createResponse() { return new GetApiKeysResponse(); }
    getTypeName() { return "RegenerateApiKeys"; }
}
