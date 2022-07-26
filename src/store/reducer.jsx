import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContact, filterContacts, getFromApi, postInApi, removeFromApi } from "./actions";
import { userApi } from "api/contactsApi";
import { JWT_TOKEN_STORAGE_KEY } from "api/constants";

const initialState = {
  items: [],
  filter: '',
  status: 'idle',
};

export const fetchContacts = createAsyncThunk(getFromApi, async () => { 
  const response = await userApi.get('contacts');
  return response.data;
});
export const saveContact = createAsyncThunk(postInApi, async (contact) => { 
  const response = await userApi.post('contacts', contact);
  return response.data;
});
export const removeContact = createAsyncThunk(removeFromApi, async (contactId) => { 
  const response = await userApi.delete(`contacts/${contactId}`);
  return response.data;
});
export const createUserRequest = async (payload) => {
  const { data } = await userApi.post('/users/signup', payload).catch(error => {
    if (error.response.status === 400) {
      alert('This email already exists.');
    }
  });
  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);
  return data;
};
export const authenticateUserRequest = async (payload) => {
  const { data } = await userApi.post('/users/login', payload).catch(error => {
    if (error.response.status === 400) {
      alert('Wrong email or password.');
    }
  });
  localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.token);
  return data;
};
export const checkIfStillAuthenticatedRequest = async () => {
  const { data } = await userApi.get('/users/current');
  return data;
};
export const logoutUserRequest = async (arg, thunkAPI) => {
  try {
    await userApi.post('/users/logout');
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  } finally {
    localStorage.removeItem(JWT_TOKEN_STORAGE_KEY);
  }
};

export const contactsReducer = createReducer(initialState, builder => {
  builder
    .addCase(deleteContact, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    })
    .addCase(filterContacts, (state, action) => {
      state.filter = action.payload;
    })

    .addCase(fetchContacts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = [...action.payload];
      state.status = 'idle';
    })
    .addCase(saveContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(saveContact.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.status = 'idle';
    })
    .addCase(removeContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(removeContact.fulfilled, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      state.status = 'idle';
    })
    .addDefaultCase((state, action) => {})
});
