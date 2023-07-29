import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useNavigate } from "react-router-dom";
// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import CustomCalendar from "examples/Cards/CalenderCard";
import Calculator from "examples/Cards/Calculator";
import WeatherWidget from "./components/WeatherWidget";
import MotivationWidget from "./components/MotivationWidget";
import FunFactsWidget from "./components/Funfacts";
// Dashboard components

function Dashboard() {
  const navigate = useNavigate();
  const { sales, tasks } = reportsLineChartData;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsersList = async () => {
    try {
      // Fetch the list of all users
      const usersSnapshot = await firestore.collection("users").get();
      const users = usersSnapshot.docs.map((doc) => doc.data());

      // Fetch the current user's data
      const currentUser = auth.currentUser;
      const currentUserId = currentUser ? currentUser.uid : null;
      let currentUserData = null;

      if (currentUserId) {
        const currentUserDoc = await firestore
          .collection("users")
          .doc(currentUserId)
          .get();
        currentUserData = currentUserDoc.exists ? currentUserDoc.data() : null;
      }

      return { users, currentUserData };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { users: [], currentUserData: null };
    }
  };

  useEffect(() => {
    // Subscribe to changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged(async (newUser) => {
      if (newUser) {
        // User is logged in, fetch user data
        const { users, currentUserData } = await fetchUsersList();
        console.log(users);
        console.log(currentUserData);
        setUser(currentUserData);
      } else {
        // User is not logged in
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check if the user is logged in and loading is completed
    if (!loading && !user) {
      console.log("User not found");
      navigate("/authentication/sign-in");
    }
  }, [loading, user, navigate]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {user && (
                <ComplexStatisticsCard
                  color="success"
                  icon="T"
                  title="Current User"
                  name={user.name}
                  emailId={user.email}
                />
              )}
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <WeatherWidget
                  apiKey="72961901719cab360af22fd7985420b7"
                  city="Canada"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
               <MotivationWidget/>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
               <FunFactsWidget/>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              <Calculator />
              </MDBox>
            </Grid>
            <Grid item xs={10} md={1} lg={6.6}>
              <MDBox>
              <CustomCalendar />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        
       
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
