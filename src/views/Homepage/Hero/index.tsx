import { Button, Container, TextIcon, ClaimLogbookDialog } from "~/components";
// import { BannerVideo } from "~/components/BannerVideo";

import styles from "./styles.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container className={styles.content}>
        <section className={styles.intro}>
          <h2>Deliver value and share benefits</h2>
          <p className={styles.subtitle}>Create, Transfer, Relay</p>
        </section>

        <section className={styles.dynamic}>
          {/* <div className={styles.image}></div> */}
          <img src="/images/logbook-intro.png" width="100%" />
          {/* <BannerVideo /> */}
        </section>

        <section className={styles.buttons}>
          <ClaimLogbookDialog>
            {({ openDialog }) => (
              <>
                <Button
                  className="u-sm-down-hide"
                  width="15rem"
                  height="3.5rem"
                  bgColor="lightMetal"
                  bgActiveColor="lightMetalHover"
                  borderRadius="1.75rem"
                  onClick={() => {
                    // TODO: analytics
                    openDialog();
                  }}
                >
                  <TextIcon size="md" weight="bold" color="blueGreen">
                    Claim
                  </TextIcon>
                </Button>

                <Button
                  className="u-sm-up-hide"
                  width="100%"
                  height="3rem"
                  bgColor="lightMetal"
                  bgActiveColor="lightMetalHover"
                  borderRadius="1.75rem"
                  onClick={() => {
                    // TODO: analytics
                    openDialog();
                  }}
                >
                  <TextIcon size="mdS" weight="bold" color="blueGreen">
                    Claim
                  </TextIcon>
                </Button>
              </>
            )}
          </ClaimLogbookDialog>

          <Button
            className="u-sm-down-hide"
            width="15rem"
            height="3.5rem"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
            borderRadius="1.75rem"
            href="/bookcase"
            onClick={() => {
              // TODO: analytics
            }}
          >
            <TextIcon size="md" weight="bold" color="white">
              My Bookcase
            </TextIcon>
          </Button>
          <Button
            className="u-sm-up-hide"
            width="100%"
            height="3rem"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
            borderRadius="1.75rem"
            href="/bookcase"
            onClick={() => {
              // TODO: analytics
            }}
          >
            <TextIcon size="mdS" weight="bold" color="white">
              My Bookcase
            </TextIcon>
          </Button>
        </section>
      </Container>

      <section className={styles.leftRadial} />
      <section className={styles.rightRadial} />
    </section>
  );
};
