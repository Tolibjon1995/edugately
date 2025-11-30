import React from "react";
import SidebarConsult from "./SidebarConsult";
import SettingsRightside from "./SettingsRightside";
import TableSettings from "../pages/TableSettings";

export default function settings() {
  return (
    <SidebarConsult>
      <SettingsRightside />
      <TableSettings />
    </SidebarConsult>
  );
}
