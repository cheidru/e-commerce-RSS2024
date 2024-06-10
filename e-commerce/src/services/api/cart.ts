import { AppMessage } from './getAppToken';
import { getUserToken } from './getUserToken';
import store, { AppDispatch } from '../../redux/store/store';
import { AuthToken } from '../../redux/store/userSlice';
import { Cart, setCart } from '../../redux/store/cartSlice';

export async function createCart(
  dispatch: AppDispatch,
  token: AppMessage<AuthToken>
) {
  const body = {
    currency: 'USD',
  };
  const resultFetch = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  )
    .then((answer) => answer.json())
    .then((answer) => {
      if (answer.errors) {
        const result: AppMessage<Cart> = {
          isError: true,
          message: answer.message,
        };
        return result;
      }
      const result: AppMessage<Cart> = {
        isError: false,
        thing: answer,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<Cart> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });
  return resultFetch;
}

export async function getUserCart(
  dispatch: AppDispatch,
  token: AppMessage<AuthToken>
) {
  const userCart = store.getState().cartSlice.cart;
  if (userCart.id) {
    const result: AppMessage<Cart> = {
      isError: false,
      thing: userCart,
    };
    return result;
  }
  const newCart = await createCart(dispatch, token);
  if (!newCart.isError) {
    dispatch(setCart(newCart.thing!));
  }
  return newCart;
}

export async function getCart(dispatch: AppDispatch) {
  const userToken = await getUserToken();
  // if (!userToken.isError) {
  return getUserCart(dispatch, userToken);
  // }
}

// export async function addLineToCart(dispatch: AppDispatch) {

//   const answer = await fetch(
//     `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((userToken) => {
//       if (userToken.errors) {
//         const result: AppMessage<undefined> = {
//           isError: true,
//           message: userToken.message,
//         };
//         return result;
//       }
//       const newToken = { ...userToken };
//       const currentDateValue = new Date().getTime() / 1000;
//       newToken.expires_in = currentDateValue + userToken.expires_in;
//       newToken.email = formData.email;
//       const result: AppMessage<AuthToken> = {
//         isError: false,
//         thing: newToken,
//       };
//       return result;
//     })
//     .catch((reason: Error) => {
//       const result: AppMessage<undefined> = {
//         isError: true,
//         message: reason.message,
//       };
//       return result;
//     });

//   if (!answer.isError && answer.thing) dispatch(setAuthToken(answer.thing));

//   return answer;
// }

export default getCart;
