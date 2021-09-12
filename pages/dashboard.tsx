import useSWR from "swr";
import {
  Heading,
  IconButton,
  useDisclosure,
  useToast,
  Box,
  Text,
  Flex,
  Grid,
} from "@chakra-ui/react";
import App from "../components/App";
import DashboardLayout, {
  ISidebarItem,
  ISidebarSection,
} from "../layouts/dashboard";
import { GetServerSideProps } from "next";
import fetchApi, { fetchSSR } from "../lib/fetch";
import { ITeam, IUser } from "../types/haas";
import Head from "next/head";
import Icon from "@hackclub/icons";
import { Formik } from "formik";
import AppCreateModal from "../components/AppCreateModal";
import { useRouter } from "next/router";
import { ErrorToast } from "../components/Toast";

export default function Dashboard(props: { user: IUser; teams: ITeam[] }) {
  const { data: teams } = useSWR("/users/me/teams", {
    initialData: props.teams,
  });
  const { data: user } = useSWR("/users/me", { initialData: props.user });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const teamList = teams.map(
    (i: ITeam): ISidebarItem => ({
      icon: "person",
      image: i.avatar || undefined,
      text: i.name || i.slug,
      url: `/teams/${i.slug}`,
    })
  );

  const sidebarSections: ISidebarSection[] = [
    {
      title: "Teams",
      items: teamList
        ? teamList.length > 0
          ? teamList
          : [{ text: "You're not a part of any teams." }]
        : [],
    },
    ,
  ];

  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hack as a Service</title>
      </Head>
      <DashboardLayout
        title="Personal Apps"
        sidebarSections={sidebarSections}
        user={user}
        actionButton={
          <IconButton aria-label="Create an app" onClick={onOpen}>
            <Icon glyph="plus" />
          </IconButton>
        }
      >
        <AppCreateModal
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={async (e, { setSubmitting }) => {
            // try {
            //   const resp = await fetchApi("/apps/", {
            //     method: "POST",
            //     body: JSON.stringify({
            //       Name: e.name || e.id,
            //       ShortName: e.id,
            //       TeamID: personalTeam.team.ID,
            //     }),
            //   });
            //   onClose();
            //   router.push(`/apps/${resp.app.ID}/deploy`);
            //   await mutatePersonalTeam();
            // } catch (e) {
            //   toast({
            //     status: "error",
            //     duration: 5000,
            //     position: "top",
            //     render: () => (
            //       <ErrorToast text="Your app couldn't be created. The ID may already be taken." />
            //     ),
            //   });
            // }
          }}
        />
        {false ? (
          <Grid
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={2}
            flex="1 0 auto"
            mt={2}
          >
            {[].map((app: any) => {
              return (
                <Box>
                  <App
                    url={`/apps/${app.ID}`}
                    name={app.Name}
                    shortName={app.ShortName}
                    key={app.ID}
                  />
                </Box>
              );
            })}
          </Grid>
        ) : (
          <Heading as="h3" size="sm" fontWeight="normal" mt={1}>
            You don't have any personal apps quite yet. 😢
          </Heading>
        )}
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [user, teams] = await Promise.all(
      ["/users/me", "/users/me/teams"].map((i) => fetchSSR(i, ctx))
    );

    return {
      props: {
        user,
        teams,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/api/login",
        permanent: false,
      },
    };
  }
};
