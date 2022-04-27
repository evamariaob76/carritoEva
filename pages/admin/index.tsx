import { AttachmentOutlined, AttachMoneyOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import {  Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

        const {data, error}= useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
                refreshInterval: 30 * 1000
        });

        const [refreshIn, setrefreshIn] = useState(30);
        useEffect(() => {
          const interval= setInterval(()=>{
                  setrefreshIn(refreshIn=> refreshIn >0 ? refreshIn -1:30)

          },1000)
        
          return () => clearInterval(interval);
        }, [])
        

        if(!error && !data){
                return <></>
        }

        if(error){
                console.log(error);
                return <Typography>Error al cargar la información</Typography>
        }

        const {
                numberOfOrders,
                paidOrders,
                numberOfClients,
                numberOfProducts,
                productsWithNoInventory,
                lowInventory,
                notPaidOrders
        }=data!;

  return (
    <AdminLayout
       title='Dasboard'
       subTitle='Estadísticas'
       icon={<DashboardOutlined/>}>
            <h2>index</h2>
        <Grid container spacing={2}>
            <SummaryTile
                    title={numberOfOrders}
                    subTitle="Órdenes totales"
                    icon={<CreditCardOutlined color="secondary"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={paidOrders}
                    subTitle="Órdenes pagadas"
                    icon={<AttachMoneyOutlined color="success"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={notPaidOrders}
                    subTitle="Órdenes pendientes"
                    icon={<CreditCardOutlined color="error"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={numberOfClients}
                    subTitle="Clientes"
                    icon={<GroupOutlined color="primary"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={numberOfProducts}
                    subTitle="Productos"
                    icon={<CategoryOutlined color="warning"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={productsWithNoInventory}
                    subTitle="Sin existencias"
                    icon={<CancelPresentationOutlined color="error"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={lowInventory}
                    subTitle="Bajo inventARIO"
                    icon={<ProductionQuantityLimitsOutlined color="warning"sx={{fontSize:40}} />}
            />
            <SummaryTile
                    title={refreshIn}
                    subTitle="Actualización en:"
                    icon={<AccessTimeOutlined color="secondary"sx={{fontSize:40}} />}
            />
  
        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage