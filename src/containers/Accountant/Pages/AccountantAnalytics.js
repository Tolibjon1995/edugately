import React from "react";
import SidebarAccountant from "./SidebarAccountant";
import AccountantGraph from "./AccountantGraph";

export default function AccountantAnalytics() {
  return (
    <div className="accountant-analytics">
      <SidebarAccountant>
        <AccountantGraph />
      </SidebarAccountant>
    </div>
  );
}
