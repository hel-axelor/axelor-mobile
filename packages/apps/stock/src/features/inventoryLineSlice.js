/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  createInventoryLine,
  searchInventoryLines,
  updateInventoryLineDetails,
} from '../api/inventory-line-api';

export const fetchInventoryLines = createAsyncThunk(
  'inventoryLines/fetchInventoryLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInventoryLines,
      data,
      action: 'fetch inventory lines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateInventoryLine = createAsyncThunk(
  'inventoryLines/updateInventoryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateInventoryLineDetails,
      data,
      action: 'update inventory line details',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const createNewInventoryLine = createAsyncThunk(
  'inventoryLines/createNewInventoryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createInventoryLine,
      data,
      action: 'create inventory line',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingInventoryLines: false,
  moreLoading: false,
  isListEnd: false,
  inventoryLineList: [],
  updateResponse: null,
  createResponse: null,
};

const inventoryLineSlice = createSlice({
  name: 'inventoryLines',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventoryLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInventoryLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInventoryLines.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.inventoryLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.inventoryLineList = [
            ...state.inventoryLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(updateInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.updateResponse = action.payload;
    });
    builder.addCase(createNewInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(createNewInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.createResponse = action.payload;
    });
  },
});

export const inventoryLineReducer = inventoryLineSlice.reducer;
