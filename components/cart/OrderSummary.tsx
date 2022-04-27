import { FC, useContext } from 'react';

import { Grid, Typography } from "@mui/material"

import { CartContext } from '../../context/cart';
import { currency } from "../../utils";

interface Props {
    orderValues?:{
        numberOfItems: number,
         subTotal : number, 
         tax : number, 
         total: number

    }
}

export const OrderSummary: FC<Props> = ({orderValues}) => {
    const {numberOfItems, subTotal, tax, total} = useContext(CartContext);
    const sumaryValues = orderValues ? orderValues :  {numberOfItems, subTotal, tax, total};

    
  return (
       <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{sumaryValues.numberOfItems} { sumaryValues.numberOfItems > 1 ? 'productos': 'producto' }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(sumaryValues.subTotal) }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(sumaryValues.tax) }</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ currency.format(sumaryValues.total) }</Typography>
        </Grid>
    </Grid>
  )
}

