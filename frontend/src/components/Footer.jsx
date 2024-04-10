import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg text-white transition-all duration-300 hover:from-red-500 hover:via-yellow-500 hover:to-green-500">
                NAWARAJ
              </span>
              Blog's
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.afu.edu.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <hr />
                  AFU Chitwan
                </Footer.Link>
                <Footer.Link
                  href="https://en.wikipedia.org/wiki/Kalikot_District"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kalikot
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  MAILA aaru thap
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <hr />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://twitter.com/PriyaKarna17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  twitter
                </Footer.Link>
                <Footer.Link
                  href="https://www.facebook.com/nawaraj.pandey.2057"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/nawarajpandey61/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <hr />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="JBN_pandey"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/nawaraj.pandey.2057"
              target="main"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.threads.net/@priyakarna56"
              target="main"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://twitter.com/i/flow/login?redirect_after_login=%2FPriyaKarna17"
              target="main"
              icon={FaTwitter}
            />
            <Footer.Icon
              href="https://github.com/hydrazin60"
              target="main"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/nawarajpandey61/"
              target="main"
              icon={FaLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
