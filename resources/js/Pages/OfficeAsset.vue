<script setup></script>

<template>
    <div class="max-w-2xl bg-white shadow rounded p-10 mx-auto my-6">
        <h2 class="text-center mb-5">Office Assets Form</h2>
        <div class="grid grid-cols-2 gap-7">
            <div class="grid grid-cols-3 gap-2">
                <!-- Code -->
                <div class="">
                    <label
                        for="code"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Code</label
                    >
                    <select
                        id="code"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                <!-- Serial Number -->
                <div class="col-span-2">
                    <label
                        for="number"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Serial Number</label
                    >
                    <input
                        type="number"
                        id="number"
                        placeholder="Enter Serial Number"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <!-- Asset Class -->
            <div class="">
                <label
                    for="asset_class"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Assets Class</label
                >
                <select
                    id="asset_class"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                </select>
            </div>

            <!-- Asset Name -->
            <div class="">
                <label
                    for="asset_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Assets Name</label
                >
                <input
                    type="text"
                    id="asset_name"
                    placeholder="Extension"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <!-- Brand Name -->
            <div class="">
                <label
                    for="brand_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Brand Name</label
                >
                <input
                    type="text"
                    id="brand_name"
                    placeholder="Enter Brand Name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <!-- Purchase Date -->
            <div class="relative">
                <label
                    for="purchase_date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Purchase Date</label
                >
                <div class="absolute bottom-3.5 end-5 flex pointer-events-none">
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                    </svg>
                </div>
                <input
                    datepicker
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                />
            </div>

            <!-- Status -->
            <div class="">
                <label
                    for="status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Status</label
                >
                <select
                    id="status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>

            <!-- Accounting Status -->
            <div class="">
                <label
                    for="accounting_status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Accounting Status</label
                >
                <select
                    id="accounting_status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>

            <!-- Quantity -->
            <div class="">
                <label
                    for="qty"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Qty</label
                >
                <input
                    type="number"
                    id="qty"
                    placeholder="Enter Qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <!-- Employee ID -->
            <div class="">
                <label
                    for="employee_id"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Employee ID</label
                >
                <input
                    type="text"
                    id="employee_id"
                    placeholder="E-00001"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div class="grid grid-cols-3 gap-2">
                <!-- Floor -->
                <div class="">
                    <label
                        for="floor"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Floor</label
                    >
                    <select
                        id="floor"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>

                <!-- Placement location -->
                <div class="col-span-2">
                    <label
                        for="location"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Placement Location</label
                    >
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <!-- Barcode Number -->
            <div class="">
                <label
                    for="barcode_num"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Barcode Number</label
                >
                <input
                    type="number"
                    id="barcode_num"
                    placeholder="Enter Barcode Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <!-- Last Check Date -->
            <div class="relative">
                <label
                    for="last_check_date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Last Check Date</label
                >
                <div
                    class="absolute bottom-3.5 end-5 flex items-center pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                    </svg>
                </div>
                <input
                    datepicker
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                />
            </div>
            <div class="col-span-2">
                <label
                    for="remark"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Remark</label
                >
                <textarea
                    id="remark"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
            </div>
        </div>
        <div class="text-center mt-5">
            <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Register
            </button>
        </div>
    </div>
</template>

<style></style>
