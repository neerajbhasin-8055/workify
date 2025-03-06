import React, { useState } from "react";
import Modal from "react-modal";
import Label from "./ui/label";
import Input from "./ui/input";
import Button from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import axios from 'axios'
Modal.setAppElement("#root"); // Prevents accessibility issues

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill => skill),
        file: user?.profile?.resume,
        profile : user?.profile?.profilePhoto
    })

    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) {
            formData.append('file', input.file)
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        setOpen(false)
        console.log(input)
    }

    const fileChangeHandler = (e) => {
        e.preventDefault()
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }
    return (
        <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            className="max-w-xl px-8 w-full bg-white py-6 rounded-lg shadow-xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >

            <div className="flex justify-between mt-4">
                <h2 className="text-lg font-bold">Update Profile</h2>
                <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                >
                    Close
                </button>
            </div>
            <form onSubmit={submitHandler}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="name">Name</Label>
                        <Input
                            onChange={changeEventHandler}
                            value={input.fullname}
                            name="fullname"
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="email">Email</Label>
                        <Input
                            onChange={changeEventHandler}
                            value={input.email}
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="number">Number</Label>
                        <Input
                            onChange={changeEventHandler}
                            value={input.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter your number"
                            id="number"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="bio">Bio</Label>
                        <Input
                            onChange={changeEventHandler}
                            value={input.bio}
                            name="bio"
                            type="text"
                            placeholder="Enter your bio"
                            id="bio"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="skills">Skills</Label>
                        <Input
                            onChange={changeEventHandler}
                            value={input.skills}
                            name="skills"
                            type="text"
                            placeholder="Enter your skills"
                            id="skills"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="file">Resume</Label>
                        <Input
                            name="file"
                            type="file"
                            id="file"
                            className="col-span-3"
                            onChange={fileChangeHandler}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <Label className="my-4" htmlFor="file">Profile</Label>
                        <Input
                            name="profile"
                            type="file"
                            id="profile"
                            className="col-span-3"
                            onChange={fileChangeHandler}
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 hover:text-gray-200"
                    disabled={loading}
                >
                    {loading ? <ClipLoader color="#ffffff" size={20} /> : "Update"}
                </Button>
            </form>


        </Modal>
    );
};

export default UpdateProfileDialog;
