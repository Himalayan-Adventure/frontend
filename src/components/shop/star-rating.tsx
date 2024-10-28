import { AiFillStar } from "react-icons/ai";

export const StarRating = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: filledStars }, (_, index) => (
        <AiFillStar key={index} className="text-lg text-primary" />
      ))}
      {hasHalfStar && (
        <AiFillStar className="text-lg text-primary opacity-50" />
      )}
      {Array.from(
        { length: totalStars - filledStars - (hasHalfStar ? 1 : 0) },
        (_, index) => (
          <AiFillStar key={index} className="text-lg text-gray-300" />
        ),
      )}
      <span className="text-sm text-gray-500">({reviews} reviews)</span>
    </div>
  );
};
