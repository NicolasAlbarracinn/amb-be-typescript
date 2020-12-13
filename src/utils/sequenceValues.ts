import { Model, Document } from 'mongoose';

export const getValueForNextSequence = async <T extends Document>(
  model: Model<T>,
  sequenceOfName: string,
): Promise<number> => {
  const sequenceDoc = await model
    .findOne()
    .sort({ [sequenceOfName]: -1 })
    .limit(1);
  if (sequenceDoc) {
    return sequenceDoc.get(sequenceOfName) + 1;
  }
  return 1;
};
