import AdminLayout from "../layouts/AdminLayout";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    { id: 1, product: "Luxury Hoodie", customer: "John Doe", rating: 5, comment: "Amazing quality, definitely worth the price!", date: "2026-05-10" },
    { id: 2, product: "Classic Tee", customer: "Sarah Smith", rating: 4, comment: "Very comfortable, but slightly larger than expected.", date: "2026-05-12" },
    { id: 3, product: "Premium Denim", customer: "Mike Johnson", rating: 5, comment: "The fit is perfect. Fast shipping too.", date: "2026-05-14" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Reviews</h1>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{review.product}</h3>
                <p className="text-gray-400 text-sm">by {review.customer} • {review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />
                ))}
              </div>
            </div>
            <p className="text-gray-300 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
