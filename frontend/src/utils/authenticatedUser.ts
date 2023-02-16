import { withSSRContext } from "aws-amplify";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export async function authenticatedUser(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<boolean> {
  const { Auth } = withSSRContext(context);
  
  try {
    await Auth.currentAuthenticatedUser();
  } catch (error) {
    return false;
  }

  return true;
}
