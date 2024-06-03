import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';


const UpdateOrganizerModal = ({ isOpen, handleOrganizerUpdate, organizerInfo, close }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { displayName, photoURL, contact } = organizerInfo || {};
    const { email, phone} = contact || {};
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={close}>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-50' />
                    </TransitionChild>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <DialogPanel className='w-full max-w-md transform overflow-hidden md:ml-60 rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>

                                    <hr className='mt-8 ' />
                                    <div className='flex flex-col mt-2 justify-between'>
                                        <form onSubmit={handleSubmit(handleOrganizerUpdate)} className="block w-[90%] mx-auto">
                                            {/* Full Name */}
                                            <label className="block mt-3">Name</label>
                                            <input defaultValue={displayName} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Full Name" name="displayName"{...register("name", { required: true })} />
                                            {errors.displayName && <span className="text-red-500">This field is required</span>}

                                            {/* Photo */}
                                            <label className="block mt-3">Photo</label>
                                            <input className="block border w-full px-5 py-2 mt-1" type="file"  placeholder={photoURL} name="photo"{...register("photo", { required: false })} />
                                            {errors.photo && <span className="text-red-500">This field is required</span>}

                                            {/* Email */}
                                            <label className="block mt-3">Email</label>
                                            <input defaultValue={email} className="block border w-full px-5 py-2 mt-1" type="email" placeholder="Email" name="email"{...register("email")} />
                                            {errors.email && <span className="text-red-500">This field is required</span>}

                                            {/* Phone */}
                                            <label className="mt-3 block">Phone</label>
                                            <input defaultValue={phone} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Phone" name="phone"{...register("phone", { required: true })} />
                                            {errors.phone && <span className="text-red-500">This field is required</span>}

                                            <div className='flex justify-between mt-5'>
                                                <Button 
                                                    type="submit" 
                                                    className="bg-green-500 normal-case px-3 py-3 text-[15px] font-semibold mx-auto flex justify-center items-center">
                                                    {
                                                        // isUserLoading ? <ImSpinner9 className="animate-spin" /> : 'Signup'
                                                        'Update'
                                                    }
                                                </Button>
                                                <Button 
                                                    onClick={close}
                                                    type="submit" 
                                                    className="bg-green-500 normal-case px-3 py-3 text-[15px] font-semibold  mx-auto flex justify-center items-center">
                                                    {
                                                        // isUserLoading ? <ImSpinner9 className="animate-spin" /> : 'Signup'
                                                        'Cancel'
                                                    }
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

UpdateOrganizerModal.propTypes = {
    isOpen: PropTypes.bool,
    handleOrganizerUpdate: PropTypes.func,
    close: PropTypes.func,
    organizerInfo: PropTypes.object,
};
export default UpdateOrganizerModal;