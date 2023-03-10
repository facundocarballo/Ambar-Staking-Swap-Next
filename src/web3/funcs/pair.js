import { Contract_Ambar_ERC20_Address } from ".";

export const getPairInfo = async (Contract) => {
    const reserves = await Contract.methods.getReserves().call();

    const token0_address = await Contract.methods.token0().call();
    const token0_reserve = reserves[0];

    const token1_address = await Contract.methods.token1().call();
    const token1_reserve = reserves[1];

    let price = 1;

    if (token0_address == Contract_Ambar_ERC20_Address) {
        price = reserves[1]/reserves[0];
    } else {
        price = reserves[0]/reserves[1];
    }

    // Esto es necesario para que funcione el Swap. Sino no funciona, porque dice que no es el precio suficiente
    // Es decir, si dejamos el precio exacto. No puede dar algo de % para los proveedores de la pool.
    // Entonces tenemos que aumentar el precio un poco para que tenga ese margen la pool de liquidez.
    price *= 1.02;

    return {
        token0: {
            address: token0_address,
            reserve: token0_reserve
        },
        token1: {
            address: token1_address,
            reserve: token1_reserve
        },
        price: price,
        contract: Contract
    }

}