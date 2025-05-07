import asyncHandler from "express-async-handler";

import ApiError from "../Utils/ApiError.js";
import ApiFeature from "../Utils/apiFeature.js";

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(new ApiError("Document creation failed", 400));
    }
    res.status(201).json({
      success: true,
      data: doc,
    });
  });

export const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const countDocuments = await Model.countDocuments();
    const apifeature = new ApiFeature(Model.find(filter), req.query)
      .limitFields()
      .sorting()
      .search()
      .Filtration()
      .paginate(countDocuments);

    const { mongooseQuery, paginationResult } = apifeature;
    const doucuments = await mongooseQuery;

    res.status(200).json({
      result: doucuments.length,
      paginationResult,
      data: doucuments,
    });
  });
export const getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(200).json({
      success: true,
      data: doc,
    });
  });
export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(200).json({
      success: true,
      data: doc,
    });
  });
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(204).json({
      success: true,
      data: null,
    });
  });
