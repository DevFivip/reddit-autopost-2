// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";



import { CredentialsLogin, AuthUser } from '../../prisma/types/user'
import { verifyLogin } from '../../prisma/user'

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
const authenticator = new Authenticator<AuthUser  | null>(
  sessionStorage,
  {
    sessionKey: "sessionKey", // keep in sync
    sessionErrorKey: "sessionErrorKey", // keep in sync
  }
);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    // get the data from the form...
    let email = (form.get("email") as string).toLowerCase();
    let password = form.get("password") as string;

    // initiialize the user here
    // let user: AutorizeUser = {
    //   id:0,
    //   name:'',
    //   email: '',
    //   token:'',
    // };

    // do some validation, errors are in the sessionErrorKey
    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Credentials: Email is required");
    if (typeof email !== "string")
      throw new AuthorizationError("Bad Credentials: Email must be a string");

    if (!password || password?.length === 0)
      throw new AuthorizationError("Bad Credentials: Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError(
        "Bad Credentials: Password must be a string"
      );

    const credentials: CredentialsLogin = {
      email,
      password,
    };

    const user = await verifyLogin(credentials);

    if (!user) throw new AuthorizationError('Authentication Error user not fund');

    if (typeof user === "object") {
      console.log(user);

      // login the user, this could be whatever process you want
      if (email === user?.email && password === user?.password) {
        const authUser: AuthUser = {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          role_id: user?.role_id,
          token: `${password}-${new Date().getTime()}`,
        };

        console.log({authUser});

        // the type of this user must match the type you pass to the Authenticator
        // the strategy will automatically inherit the type if you instantiate
        // directly inside the `use` method
        return await Promise.resolve({ ...authUser });
      } else {
        // if problem with user throw error AuthorizationError
        throw new AuthorizationError("Error de credenciales");
      }
    } else {
      throw new AuthorizationError("Usuario no encontrado");
    }
  })
);

export default authenticator;
