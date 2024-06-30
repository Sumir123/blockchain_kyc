import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { TransactionContext } from "../../context/TransactionContext";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
function LandingPage() {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <div>
      <nav className="bg-bg-3 sticky-top py-4 py-lg-7">
        <div className="d-block d-lg-none">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-3 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <a
                  href="#"
                  className="btn btn-width-equal-height d-lg-none rounded-circle custom-mobile-nav-btn"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#custom-id-rxc4oo09"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-light-1"
                  >
                    <path d="M2.00016 5.33333H14.0002C14.177 5.33333 14.3465 5.2631 14.4716 5.13807C14.5966 5.01305 14.6668 4.84348 14.6668 4.66667C14.6668 4.48986 14.5966 4.32029 14.4716 4.19526C14.3465 4.07024 14.177 4 14.0002 4H2.00016C1.82335 4 1.65378 4.07024 1.52876 4.19526C1.40373 4.32029 1.3335 4.48986 1.3335 4.66667C1.3335 4.84348 1.40373 5.01305 1.52876 5.13807C1.65378 5.2631 1.82335 5.33333 2.00016 5.33333ZM14.0002 10.6667H2.00016C1.82335 10.6667 1.65378 10.7369 1.52876 10.8619C1.40373 10.987 1.3335 11.1565 1.3335 11.3333C1.3335 11.5101 1.40373 11.6797 1.52876 11.8047C1.65378 11.9298 1.82335 12 2.00016 12H14.0002C14.177 12 14.3465 11.9298 14.4716 11.8047C14.5966 11.6797 14.6668 11.5101 14.6668 11.3333C14.6668 11.1565 14.5966 10.987 14.4716 10.8619C14.3465 10.7369 14.177 10.6667 14.0002 10.6667ZM14.0002 7.33333H2.00016C1.82335 7.33333 1.65378 7.40357 1.52876 7.5286C1.40373 7.65362 1.3335 7.82319 1.3335 8C1.3335 8.17681 1.40373 8.34638 1.52876 8.4714C1.65378 8.59643 1.82335 8.66667 2.00016 8.66667H14.0002C14.177 8.66667 14.3465 8.59643 14.4716 8.4714C14.5966 8.34638 14.6668 8.17681 14.6668 8C14.6668 7.82319 14.5966 7.65362 14.4716 7.5286C14.3465 7.40357 14.177 7.33333 14.0002 7.33333Z"></path>
                  </svg>
                </a>
              </div>
              <div
                className="col-6 text-center aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="250"
              >
                <a href="#">
                  <img
                    src="i/logo-dark.png"
                    srcset="i/logo-dark@2x.png 2x"
                    alt=""
                    className="img-fluid aos-init aos-animate w-50 "
                    data-aos="fade-down"
                    data-aos-delay="0"
                  />
                </a>
              </div>
              <div
                className="col-3 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="500"
              ></div>
            </div>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start bg-bg-3"
          id="custom-id-rxc4oo09"
          aria-hidden="true"
        >
          <div className="offcanvas-header">
            <a href="#">
              <img
                src="i/logo-dark.png"
                srcset="i/logo-dark@2x.png 2x"
                alt=""
                className="img-fluid"
              />
            </a>
            <a
              href="#"
              className="btn btn-sm btn-width-equal-height btn-light-1"
              data-bs-dismiss="offcanvas"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-dark-2"
              >
                <path d="M8.9398 8L13.1398 3.80667C13.2653 3.68113 13.3359 3.51087 13.3359 3.33333C13.3359 3.1558 13.2653 2.98554 13.1398 2.86C13.0143 2.73447 12.844 2.66394 12.6665 2.66394C12.4889 2.66394 12.3187 2.73447 12.1931 2.86L7.9998 7.06L3.80646 2.86C3.68093 2.73447 3.51066 2.66394 3.33313 2.66394C3.1556 2.66394 2.98533 2.73447 2.8598 2.86C2.73426 2.98554 2.66374 3.1558 2.66374 3.33333C2.66374 3.51087 2.73426 3.68113 2.8598 3.80667L7.0598 8L2.8598 12.1933C2.79731 12.2553 2.74771 12.329 2.71387 12.4103C2.68002 12.4915 2.6626 12.5787 2.6626 12.6667C2.6626 12.7547 2.68002 12.8418 2.71387 12.9231C2.74771 13.0043 2.79731 13.078 2.8598 13.14C2.92177 13.2025 2.99551 13.2521 3.07675 13.2859C3.15798 13.3198 3.24512 13.3372 3.33313 13.3372C3.42114 13.3372 3.50827 13.3198 3.58951 13.2859C3.67075 13.2521 3.74449 13.2025 3.80646 13.14L7.9998 8.94L12.1931 13.14C12.2551 13.2025 12.3288 13.2521 12.4101 13.2859C12.4913 13.3198 12.5785 13.3372 12.6665 13.3372C12.7545 13.3372 12.8416 13.3198 12.9228 13.2859C13.0041 13.2521 13.0778 13.2025 13.1398 13.14C13.2023 13.078 13.2519 13.0043 13.2857 12.9231C13.3196 12.8418 13.337 12.7547 13.337 12.6667C13.337 12.5787 13.3196 12.4915 13.2857 12.4103C13.2519 12.329 13.2023 12.2553 13.1398 12.1933L8.9398 8Z"></path>
              </svg>
            </a>
          </div>
          <div className="offcanvas-body">
            <div>
              <a href="#" className="fw-bold text-dark-1 py-2 d-inline-block">
                Home
              </a>
            </div>
            <div>
              <a href="#" className="fw-bold text-dark-1 py-2 d-inline-block">
                Features
              </a>
            </div>
            <div>
              <a href="#" className="fw-bold text-dark-1 py-2 d-inline-block">
                Blog
              </a>
            </div>
            <div>
              <a href="#" className="fw-bold text-dark-1 py-2 d-inline-block">
                Prices
              </a>
            </div>
          </div>
        </div>
        <div id="home" className="d-none d-lg-block">
          <div className="container ">
            <div className="row align-items-center justify-content-between">
              <div className="col-2">
                <a href="#">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIj9gikRbtW3d_7pAvZb6CXJg2El6adAyfojbb210Akx2G7BaUrxqG5M_WAHRo40U1jc&usqp=CAU"
                    alt="KYC"
                    className="img-fluid aos-init w-50 aos-animate"
                    data-aos="fade-down"
                    data-aos-delay="0"
                  />
                </a>
              </div>
              <div className="text-center fs-2 d-flex justify-content-center col-2">
                <a
                  href="#home"
                  className="fw-bold mx-4 text-dark-1 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="150"
                >
                  Home
                </a>
                <a
                  href="#feature"
                  className="fw-bold mx-4 text-dark-1 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="250"
                >
                  Features
                </a>
                {/* <a
                  href="#"
                  className="fw-bold mx-4 text-dark-1 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="fw-bold mx-4 text-dark-1 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="500"
                >
                  Learn More
                </a> */}
              </div>
              <div className="d-flex fs-2 align-items-center justify-content-end col-8">
                <div
                  className="fw-bold fs-4 me-8 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="650"
                >
                  {currentAccount ? (
                    "Get Started"
                  ) : (
                    <Button
                      onClick={connectWallet}
                      size="large"
                      variant="contained"
                      class="btn fs-2 btn-action-1 aos-init aos-animate"
                    >
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {currentAccount ? (
        <section className="py-10 py-lg-20 bg-bg-3 text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-9 col-xl-8 col-xxl-7">
                <p className="mb-5 fs-4">Get Started</p>
                <h2 className="display-5 mb-6">Choose Appropriate Service</h2>
                <p className="fs-1 remove-br-sm mb-0"></p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="mt-15 col-sm-4 col-lg-3 col-xl-2">
                <PersonIcon fontSize="large"></PersonIcon>

                <h5 className="my-6">I am Customer</h5>
                <Button
                  component={Link}
                  to="/user"
                  size="large"
                  variant="outlined"
                  class="btn btn-action-1 aos-init aos-animate"
                >
                  Signin{" "}
                </Button>
              </div>
              <div className="d-none d-xl-block col-xl-1"></div>
              <div className="mt-15 col-sm-4 col-lg-3 col-xl-2">
                <AccountBalanceIcon fontSize="large"></AccountBalanceIcon>

                <h5 className="my-6">I am Bank</h5>
                <Button
                  component={Link}
                  to="/bank"
                  size="large"
                  variant="outlined"
                  class="btn btn-action-1 aos-init aos-animate"
                >
                  Signin{" "}
                </Button>
              </div>
              <div className="d-none d-xl-block col-xl-1"></div>
              <div className="mt-15 col-sm-4 col-lg-3 col-xl-2">
                <SupervisorAccountIcon fontSize="large"></SupervisorAccountIcon>
                <h5 className="my-6">I am Admin</h5>
                <Button
                  component={Link}
                  to="/admin"
                  size="large"
                  variant="outlined"
                  class="btn btn-action-1 aos-init aos-animate"
                >
                  Signin
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <header className="py-20 bg-bg-3">
          <div className="container">
            <div className="row align-items-center flex-md-row-reverse">
              <div className="col-md-2">
                <img
                  src="https://signzy.com/blog/wp-content/uploads/2020/06/image-0-3.png"
                  srcset="
              pub/171668/3749e40b7e77138384cf21c3b18ceee5/uploads/image-0-3.png 2x
            "
                  alt=""
                  className="w-100 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="0"
                />
              </div>
              <div className="col-md-8 mt-8 mt-md-0 d-flex flex-column d-flex justify-content-md-center align-items-center align-content-center">
                <h1
                  className="display-3  aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="150"
                >
                  Blockchain Based KYC
                </h1>
                <p
                  className="mb-8 ml5 fs-1 aos-init aos-animate"
                  data-aos="fade-down"
                  data-aos-delay="250"
                >
                  Enhancing Security and Efficiency in Identity Verification
                  Processes
                </p>
                <Button
                  onClick={connectWallet}
                  size="large"
                  variant="contained"
                  class="btn btn-action-1  aos-init aos-animate"
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      <section class="py-10 py-lg-20 text-center bg-bg-3">
        <div id="feature" class="container">
          <div class="row justify-content-center">
            <div class="col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <h2
                class="fw-bold display-5 mb-6 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Why Decentralized-KYC
              </h2>
              <p
                class="fs-2 mb-15 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="250"
              >
                An all-in-one solution to verify your identity, streamline a KYC
                on-boarding process
              </p>
            </div>
          </div>
          <div class="row">
            <div
              class="col-lg-4 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="0"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-action-1 d-block mx-auto"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M42.692 0.254703C43.059 0.467472 43.343 0.798416 43.4976 1.19347C43.6523 1.58852 43.6683 2.02433 43.5432 2.4297L36.7895 24.3747H49.2507C49.617 24.3746 49.9752 24.4817 50.2812 24.6828C50.5873 24.8839 50.8277 25.1702 50.9729 25.5064C51.118 25.8426 51.1616 26.214 51.0981 26.5746C51.0347 26.9353 50.867 27.2695 50.6157 27.536L20.6157 59.411C20.3255 59.7196 19.9392 59.9209 19.5199 59.9819C19.1006 60.0429 18.673 59.9601 18.3068 59.747C17.9405 59.5339 17.6573 59.203 17.5032 58.8083C17.3491 58.4136 17.3333 57.9783 17.4582 57.5735L24.212 35.6247H11.7507C11.3845 35.6248 11.0263 35.5178 10.7203 35.3166C10.4142 35.1155 10.1738 34.8292 10.0286 34.493C9.88345 34.1568 9.83991 33.7854 9.90337 33.4248C9.96684 33.0641 10.1345 32.7299 10.3857 32.4635L40.3857 0.588453C40.6757 0.2802 41.0613 0.0790857 41.4801 0.0178105C41.8988 -0.0434648 42.3259 0.0387029 42.692 0.250953V0.254703ZM16.0895 31.8747H26.7507C27.0442 31.8746 27.3335 31.9435 27.5955 32.0756C27.8575 32.2077 28.0848 32.3995 28.2592 32.6355C28.4335 32.8716 28.5501 33.1452 28.5994 33.4344C28.6488 33.7237 28.6295 34.0205 28.5432 34.301L23.4132 50.9622L44.9082 28.1247H34.2507C33.9573 28.1248 33.668 28.0559 33.406 27.9238C33.144 27.7917 32.9167 27.5999 32.7423 27.3639C32.5679 27.1279 32.4514 26.8542 32.4021 26.565C32.3527 26.2757 32.372 25.9789 32.4582 25.6985L37.5882 9.0372L16.0895 31.8747Z"
                ></path>
              </svg>
              <h5 class="mb-4 mt-6">Fill Once and Forget</h5>
              <p class="mb-0">
                Just fill form once while onboarding into our service
              </p>
            </div>
            <div
              class="col-lg-4 mt-8 mb-8 mt-lg-0 mb-lg-0 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="250"
            >
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-action-1 d-block mx-auto"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4545 30L1.48945 35.8463C1.18993 36.0063 0.939497 36.2447 0.764886 36.5359C0.590276 36.8272 0.498047 37.1604 0.498047 37.5C0.498047 37.8396 0.590276 38.1728 0.764886 38.4641C0.939497 38.7553 1.18993 38.9937 1.48945 39.1537L29.6145 54.1537C29.8857 54.2982 30.1884 54.3738 30.4957 54.3738C30.803 54.3738 31.1057 54.2982 31.377 54.1537L59.502 39.1537C59.8015 38.9937 60.0519 38.7553 60.2265 38.4641C60.4011 38.1728 60.4934 37.8396 60.4934 37.5C60.4934 37.1604 60.4011 36.8272 60.2265 36.5359C60.0519 36.2447 59.8015 36.0063 59.502 35.8463L48.5482 30L44.562 32.1263L54.642 37.5L30.4995 50.3737L6.35695 37.5L16.437 32.1263L12.4507 30H12.4545Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29.6184 5.84695C29.8896 5.7025 30.1923 5.62695 30.4996 5.62695C30.807 5.62695 31.1096 5.7025 31.3809 5.84695L59.5059 20.847C59.8054 21.007 60.0558 21.2454 60.2304 21.5366C60.405 21.8279 60.4973 22.1611 60.4973 22.5007C60.4973 22.8403 60.405 23.1735 60.2304 23.4648C60.0558 23.756 59.8054 23.9944 59.5059 24.1545L31.3809 39.1545C31.1096 39.2989 30.807 39.3745 30.4996 39.3745C30.1923 39.3745 29.8896 39.2989 29.6184 39.1545L1.49336 24.1545C1.19384 23.9944 0.943403 23.756 0.768792 23.4648C0.594182 23.1735 0.501953 22.8403 0.501953 22.5007C0.501953 22.1611 0.594182 21.8279 0.768792 21.5366C0.943403 21.2454 1.19384 21.007 1.49336 20.847L29.6184 5.84695ZM6.36086 22.5007L30.4996 35.3745L54.6421 22.5007L30.4996 9.62695L6.35711 22.5007H6.36086Z"
                ></path>
              </svg>
              <h5 class="mb-4 mt-6">Get Verified</h5>
              <p class="mb-0">
                Our team will help you to get verified by financial instutions
              </p>
            </div>
            <div
              class="col-lg-4 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-action-1 d-block mx-auto"
              >
                <path d="M21.5625 50.625C22.1887 49.3762 22.5 47.5013 22.5 45H37.5C37.5 47.5013 37.8113 49.3762 38.4375 50.625H41.25C41.7473 50.625 42.2242 50.8225 42.5758 51.1742C42.9275 51.5258 43.125 52.0027 43.125 52.5C43.125 52.9973 42.9275 53.4742 42.5758 53.8258C42.2242 54.1775 41.7473 54.375 41.25 54.375H18.75C18.2527 54.375 17.7758 54.1775 17.4242 53.8258C17.0725 53.4742 16.875 52.9973 16.875 52.5C16.875 52.0027 17.0725 51.5258 17.4242 51.1742C17.7758 50.8225 18.2527 50.625 18.75 50.625H21.5625Z"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M52.4663 11.25H7.5C6.28125 11.25 5.6175 11.5425 5.2425 11.7937C4.83058 12.0805 4.50195 12.4713 4.29 12.9262C3.97035 13.5867 3.78671 14.3047 3.75 15.0375V37.5C3.75 38.7188 4.0425 39.3825 4.29375 39.7575C4.55625 40.1513 4.93125 40.4625 5.42625 40.71C6.05826 41.0161 6.74314 41.1982 7.44375 41.2463L7.5375 41.25H52.5C53.7188 41.25 54.3825 40.9575 54.7575 40.7062C55.1694 40.4195 55.4981 40.0287 55.71 39.5738C56.0161 38.9417 56.1982 38.2569 56.2463 37.5563L56.25 37.4625V15C56.25 13.7812 55.9575 13.1175 55.7062 12.7425C55.4196 12.3305 55.0288 12.0018 54.5738 11.79C53.9133 11.4703 53.1953 11.2867 52.4625 11.25H52.4663ZM52.5 7.5H7.5C0 7.5 0 15 0 15V37.5C0 45 7.5 45 7.5 45H52.5C60 45 60 37.5 60 37.5V15C60 7.5 52.5 7.5 52.5 7.5Z"
                ></path>
              </svg>
              <h5 class="mb-4 mt-6">Your Business Your Data</h5>
              <p class="mb-0">
                Our decentralized and encryption algorithms will keep you data
                safe and under your control
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-10 py-lg-20 bg-bg-3 text-center text-md-start">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9 col-lg-9 col-xl-9 col-xxl-9">
              <h2
                class="display-5 mb-6 w-70 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                With Decentralized-KYC you and your business will remain
                compliant to GDPR, KYC laws globally.
              </h2>
              <p
                class="fs-2 remove-br-sm mb-0 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="150"
              ></p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 py-lg-20 text-center bg-bg-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <h2
                className="display-5 mb-6 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Our Partner Banks
              </h2>
              <p
                className="mb-15 fs-2 aos-init aos-animate"
                data-aos="fade-down"
                data-aos-delay="150"
              ></p>
            </div>
          </div>

          <div className="row justify-content-center mb-lg-12">
            <div
              className="col-lg-3 col-md-5 col-sm-6 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="250"
            >
              <img
                src="https://siteadmin.nabilbank.com/assets/backend/uploads/nabil-logo.png"
                alt="nabil-logo"
                className="img-fluid rounded-circle mb-6"
              />
              <h5 className="mb-2"></h5>
              <p className="mb-12"></p>
            </div>
            <div
              className="col-lg-3 col-md-5 col-sm-6 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Mega_Bank_Logo.png"
                alt="megalogo"
                className="img-fluid rounded-circle mb-6"
              />
              <h5 className="mb-2"></h5>
              <p className="mb-12"></p>
            </div>
            <div
              className="col-lg-3 col-md-5 col-sm-6 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <img
                src="https://logodownload.org/wp-content/uploads/2019/12/standard-chartered-logo-3.png"
                alt="standardchartered"
                className="img-fluid rounded-circle mb-6"
              />
              <h5 className="mb-2"></h5>
              <p className="mb-12"></p>
            </div>
            <div
              className="col-lg-3 col-md-5 col-sm-6 aos-init aos-animate"
              data-aos="fade-down"
              data-aos-delay="650"
            >
              <img
                src="https://reliablelife.com.np/wp-content/uploads/2019/01/global-ime-bank-1.jpg"
                alt="global ime bank"
                className="img-fluid rounded-circle mb-6"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-bg-3 pb-md-8 pt-md-10 py-8 text-center">
        <div className="container">
          <a
            href="#"
            target="_blank"
            className="mx-3 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-dark-1"
            >
              <path d="M22.4591 6C21.6891 6.35 20.8591 6.58 19.9991 6.69C20.8791 6.16 21.5591 5.32 21.8791 4.31C21.0491 4.81 20.1291 5.16 19.1591 5.36C18.3691 4.5 17.2591 4 15.9991 4C13.6491 4 11.7291 5.92 11.7291 8.29C11.7291 8.63 11.7691 8.96 11.8391 9.27C8.27906 9.09 5.10906 7.38 2.99906 4.79C2.62906 5.42 2.41906 6.16 2.41906 6.94C2.41906 8.43 3.16906 9.75 4.32906 10.5C3.61906 10.5 2.95906 10.3 2.37906 10V10.03C2.37906 12.11 3.85906 13.85 5.81906 14.24C5.18979 14.4122 4.52916 14.4362 3.88906 14.31C4.16067 15.1625 4.6926 15.9084 5.41008 16.4429C6.12756 16.9775 6.99451 17.2737 7.88906 17.29C6.37269 18.4904 4.49306 19.1393 2.55906 19.13C2.21906 19.13 1.87906 19.11 1.53906 19.07C3.43906 20.29 5.69906 21 8.11906 21C15.9991 21 20.3291 14.46 20.3291 8.79C20.3291 8.6 20.3291 8.42 20.3191 8.23C21.1591 7.63 21.8791 6.87 22.4591 6Z"></path>
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            className="mx-3 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="150"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-dark-1"
            >
              <path d="M12 2.03906C6.5 2.03906 2 6.52906 2 12.0591C2 17.0591 5.66 21.2091 10.44 21.9591V14.9591H7.9V12.0591H10.44V9.84906C10.44 7.33906 11.93 5.95906 14.22 5.95906C15.31 5.95906 16.45 6.14906 16.45 6.14906V8.61906H15.19C13.95 8.61906 13.56 9.38906 13.56 10.1791V12.0591H16.34L15.89 14.9591H13.56V21.9591C15.9164 21.5869 18.0622 20.3846 19.6099 18.5691C21.1576 16.7537 22.0054 14.4447 22 12.0591C22 6.52906 17.5 2.03906 12 2.03906Z"></path>
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            className="mx-3 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="250"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-dark-1"
            >
              <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"></path>
            </svg>
          </a>
          <div
            className="mt-10 mb-8 border-bottom border-dark-3 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="400"
          ></div>
          <p
            className="fs-5 mb-0 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            Copyright © 2023 Decentralized KYC
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
