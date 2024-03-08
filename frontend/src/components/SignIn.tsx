import React from 'react';
import { SignIn, SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react"

const Clerk: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center  w-full py-8 px-4"> {/* Added px-4 for padding on the sides on smaller screens */}
      
      <SignedOut>
        <div>
       <SignIn></SignIn>
        </div>
        
      </SignedOut>
      <SignedIn>
        <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>
        <SignOutButton></SignOutButton>
        
      </SignedIn>
    </div>
  );
};

export default Clerk;
