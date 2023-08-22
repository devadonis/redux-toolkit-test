import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTab, deleteAll, navigateTab } from "@src/redux/test";
import { Nav, NavItem, NavLink, Button, TabContent, TabPane, } from 'reactstrap';

import { Company, QuickQuotes, Bids, Inventory, Reports, InboundStock, Settings, ConsigneePortal } from '@components/test'

const CustomTabs = () => {
  const tabs = useSelector(
    (state) => state.test.tabs
  )

  const currentTab = useSelector(
    (state) => state.test.currentTab
  )

  const dispatch = useDispatch()

  const closeOne = (tab) => {
    dispatch(
      deleteTab(tab)
    )
  };

  const closeAll = () => {
    dispatch(
      deleteAll()
    )
  }

  const move = (tab) => {
    dispatch(
      navigateTab(tab)
    )
  }

  return (
    <div>
      <Nav tabs>
        {tabs.map((tab, i) => (
          <NavItem key={i}>
            <NavLink
              className={currentTab === tab ? 'active' : ''}
              onClick={() => move(tab)}
            >
              {tab}
              {tab !== 'home' && (
                <Button onClick={() => closeOne(tab)} className='ms-1' close>
                </Button>
              )}
            </NavLink>
          </NavItem>
        ))}
        <NavItem>
          <Button onClick={() => closeAll()} className="btn btn-danger p-1" close type="button"></Button>
        </NavItem>
      </Nav>
      <TabContent activeTab={currentTab}>
        <TabPane tabId="companies">
          <Company />
        </TabPane>
        <TabPane tabId="quick-quotes">
          <QuickQuotes />
        </TabPane>
        <TabPane tabId="bids">
          <Bids />
        </TabPane>
        <TabPane tabId="inventory">
          <Inventory />
        </TabPane>
        <TabPane tabId="reports">
          <Reports />
        </TabPane>
        <TabPane tabId="inbound-stock">
          <InboundStock />
        </TabPane>
        <TabPane tabId="settings">
          <Settings />
        </TabPane>
        <TabPane tabId="consignee-portal">
          <ConsigneePortal />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default CustomTabs