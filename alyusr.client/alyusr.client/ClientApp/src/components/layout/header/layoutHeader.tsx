import React, { FC } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../slice/userAuthincateSlice";
import { CookieSet, isUserAuthenticated } from "../../../utils";
import { LangSwitcherReactI18 } from "../../languageSwitcher/react-i18/langSwitcher";

export const LayoutHeader: FC<any> = () => {
  const { t } = useTranslation();
  const tokenKey = process.env.REACT_APP_authenticatedTokenStorageKey || "xx";
  const userKey = process.env.REACT_APP_authenticatedUserStorageKey || "xx";
  // let user: AuthenticateUserResponse = useSelector((state: any) => ({
  //   ...state.user,
  // }));
  // user = {
  //   Result: null,
  //   userToken: null,
  //   isLoading: false,
  //   isAuthenticated: false,
  // };
  //console.log("user", user);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <LangSwitcherReactI18 />
      <p>
        {isUserAuthenticated() && (
          <>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="/">Alyuser</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    {/* <Nav.Link href="users">Users</Nav.Link> */}
                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                      <NavDropdown.Item href="users">Users</NavDropdown.Item>
                      <NavDropdown.Item href="/company/setting">
                        Company-Settings
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Button
                    variant="outline-primary"
                    onClick={async () => {
                      CookieSet(tokenKey, "", -10);
                      CookieSet(userKey, "", -10);
                      dispatch(
                        // @ts-ignore
                        logoutUser()
                      );
                      navigate("/");
                    }}
                  >
                    {t("logout.button")}
                  </Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        )}
      </p>
    </>
  );
};
