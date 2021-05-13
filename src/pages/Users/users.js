import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
  } from '@windmill/react-ui';

  import {GetAllUsers} from './slice';


import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import CTA from '../../components/CTA'


const Users = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users);
    
    useEffect(() => {
       dispatch(GetAllUsers()) 
    },[])
    
    const onPageChange = () => {}
    const resultsPerPage = 10;
    const totalResults = 10;

    return (
        <>
            <div className="py-2">
            <TableContainer>
                <Table>
                <TableHeader>
                    <tr>
                    <TableCell>Email</TableCell>
                    <TableCell>2FA Action</TableCell>
                    <TableCell>Login Status</TableCell>
                    <TableCell>Wallet Type</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {users.map((user, i) => (
                    <TableRow key={i}>
                        <TableCell>
                        <div className="flex items-center text-sm">
                            {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" /> */}
                            <div>
                            <p className="font-semibold">{user.email}</p>
                            {/* <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p> */}
                            </div>
                        </div>
                        </TableCell>
                        <TableCell>
                        <span className="text-sm">{user.enabled_2fa ? "Enabled" : "Disabled"}</span>
                        </TableCell>
                        <TableCell>
                        <Badge type={user.status}>{user.blocked_at ? "InActive" : "Active"}</Badge>
                        </TableCell>
                        <TableCell>
                        <span className="text-sm">{user.accounts[0]?.type}</span>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                <TableFooter>
                <Pagination
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    label="Table navigation"
                    onChange={onPageChange}
                />
                </TableFooter>
      </TableContainer>

            </div>
        </>        
    )
}

export default Users;