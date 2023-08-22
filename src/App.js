import React, { Suspense, useEffect, useState } from "react";
import Router from "./router/Router";

import Spinner from "./@core/components/spinner/Fallback-spinner";


const App = () => {

  const [loading, setLoading] = useState(false);


  if (loading) {
    return <Spinner />;
  }

  return (
      <Suspense fallback={null}>
        <Router />
      </Suspense>
  );
};

export default App;
