import React from 'react';

const customerReview = [
    {
        id : 1,
        name: "pramod lakshan",
        Comment: "i highly recomended bkjiosjdoa ujisajodoa iaidjoasdo",
        image: "https://media.licdn.com/dms/image/v2/D5635AQGT20Uym5i1MQ/profile-framedphoto-shrink_400_400/B56ZfVPzN5G0Ac-/0/1751629378721?e=1752235200&v=beta&t=UQR_2i8XaShnM-ovvNK7HJVtobC3auP8amrOisx4a3U",
    },
    {
        id : 1,
        name: "pramod lakshan",
        Comment: "i highly recomended bkjiosjdoa ujisajodoa iaidjoasdo",
        image: "https://media.licdn.com/dms/image/v2/D5635AQGT20Uym5i1MQ/profile-framedphoto-shrink_400_400/B56ZfVPzN5G0Ac-/0/1751629378721?e=1752235200&v=beta&t=UQR_2i8XaShnM-ovvNK7HJVtobC3auP8amrOisx4a3U",
    },
    {
        id : 1,
        name: "pramod lakshan",
        Comment: "i highly recomended bkjiosjdoa ujisajodoa iaidjoasdo",
        image: "https://media.licdn.com/dms/image/v2/D5635AQGT20Uym5i1MQ/profile-framedphoto-shrink_400_400/B56ZfVPzN5G0Ac-/0/1751629378721?e=1752235200&v=beta&t=UQR_2i8XaShnM-ovvNK7HJVtobC3auP8amrOisx4a3U",
    },

]

function CustomerReview() {
  return (
    <div className="h-screen   bg-gray-100 dark:bg-gray-900 flex flex-wrap gap-3 items-center justify-center p-4 overflow-hidden">
        {customerReview.map((review) => (
            <div 
                key={review.id}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-[#3d3b51] dark:border-gray-700">
                <img
                className="rounded-full w-32 sm:w-40 md:w-48 h-auto mx-auto pb-3"
                src={review.image}
                alt={`${review.name}'s photo`}
                />
                <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {review.name}
                </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {review.Comment}
                </p>
            </div>
        ))}
    </div>
  );
}

export default CustomerReview;
