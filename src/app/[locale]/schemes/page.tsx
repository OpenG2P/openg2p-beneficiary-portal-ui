"use client";

import { AuthUtil } from '@/features/auth';
import { useLocale } from "next-intl";
import { useState } from "react";

export default function SchemePage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        place: "",
        date: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleApply = () => {
        console.log("Applied data:", formData);
        alert("Application submitted!");
        setFormData({ name: "", email: "", phone: "", place: "", date: "" });
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-black mb-6">
                Potential Applicable Schemes
            </h1>

            <div className="bg-white rounded-lg p-6 border border-black/20">
                <h2 className="text-xl text-black font-semibold mb-2">
                    OpenG2P Social Safety Net Program
                </h2>
                <div className="border-b-3 border-gray-300 mb-6"></div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 text-gray-700">
                        <p className="mb-2">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                        <p className="mb-2">
                            Many desktop publishing packages and web page editors now use as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
                        </p>
                        <p className="mb-2">
                            There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                        </p>
                        <p className="mb-2">
                            Contrary to popular belief, is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                        </p>
                        <p>
                            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                        </p>
                    </div>

                    <div className="md:w-1/3 bg-[#D9D9D9] p-4 rounded-lg">
                        <h3 className="text-lg text-black font-semibold mb-4 ml-2">Apply Now</h3>
                        <div className="space-y-3 m-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 bg-white text-black  rounded-md border border-gray-300"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 bg-white text-black  rounded-md border border-gray-300"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 bg-white text-black  rounded-md border border-gray-300"
                            />
                            <input
                                type="text"
                                name="place"
                                placeholder="Place"
                                value={formData.place}
                                onChange={handleChange}
                                className="w-full p-2 bg-white text-black rounded-md border border-gray-300"
                            />
                            <input
                                type="date"
                                name="date"
                                placeholder="Date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-2 bg-white text-black  rounded-md border border-gray-300"
                            />
                        </div>

                        <button
                            className="mt-4 px-4 py-2 ml-2 bg-black text-white rounded-md cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
