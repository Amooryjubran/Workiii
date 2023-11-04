import { useEffect } from "react";
import useSignUpStore from "@/store/useSignUpStore";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SuccessSignUp() {
  const { userType } = useSignUpStore();
  const { isLoaded, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the user is loaded
    if (isLoaded && user) {
      console.log("User:", user);

      // If the user already has a userType, redirect them
      if (userType) {
        // The path you redirect to could be dependent on the userType
        navigate(`/${userType}-dashboard`);
      } else {
        // Make an API request to set the userType
        const updateUserType = async () => {
          try {
            const response = await fetch(`/api/${user.id}/type`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                // Include other headers as necessary, e.g., authentication tokens
              },
              body: JSON.stringify({ userType }),
            });
            const data = await response.json();
            console.log("Update userType response:", data);

            // After a successful update, you can redirect or do something else
            navigate("/user-dashboard");
          } catch (error) {
            console.error("Failed to update userType:", error);
          }
        };

        updateUserType();
      }
    }
  }, [isLoaded, user, userType, navigate]);

  // Placeholder content, you might have a loading spinner or similar here
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <div>Welcome, {user?.firstName}!</div>;
}
