<template>
    <div
        class="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden bg-gray-600 bg-opacity-50 outline-none"
        @mouseup="dragEnd">
        <div
            class="relative top-20 mx-auto max-w-xl rounded-md border bg-white p-5 shadow-lg">
            <div class="m-auto text-center">
                <h1 class="text-2xl">Upload Image</h1>
                <input
                    class="focus:border-primary focus:shadow-primary relative mt-3 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                    type="file"
                    id="image_upload"
                    @change="fileValidation"
                    accept=".svg, image/png, image/jpeg, image/gif" />
                <p class="mt-1 text-sm text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 5mb).
                </p>

                <div
                    v-if="previewUrl"
                    class="relative m-4 select-none rounded-lg">
                    <div
                        class="absolute h-full w-full overflow-hidden"
                        @mouseleave="dragEnd">
                        <i
                            class="absolute left-0 aspect-square h-full rounded-full border-4 border-solid border-black"
                            @load="setWidthOrHeight"
                            id="image-highlight"
                            @mousedown="dragStart"
                            @mousemove="drag" />
                    </div>
                    <img :src="previewUrl" id="image" />
                </div>

                <p class="mt-2 text-right text-xs text-red-600">
                    {{ error }}
                </p>
            </div>
            <div class="mt-3 flex justify-end gap-3">
                <button
                    class="rounded-lg border border-solid border-black bg-gray-600 px-3 py-1.5 text-white hover:bg-gray-700"
                    @click="closeModal">
                    Cancel
                </button>
                <button
                    class="rounded-lg border border-solid border-black bg-green-600 px-3 py-1.5 text-white hover:bg-green-700"
                    @click="fileUpload">
                    Upload
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
const emit = defineEmits({"closeModal":null , "submitUpload": (imageData) => {
    console.log(imageData)
    if (imageData)
        return imageData
    else{
        console.log('error')
        return null
    }
}});
const error = ref("");
const previewUrl = ref(null);
const mousePosition = ref([0, 0]);
const mouseIsDown = ref(false);
const PFPSIZE = 300;

const fileValidation = (e) => {
    let file = e.target.files[0];

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // Check file type
    const extension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
        error.value =
            "*Invalid file type. Please upload a JPG, JPEG, PNG, or GIF file.";
        e.target.value = "";
        return false;
    }

    // Check file size
    if (file.size > maxFileSize) {
        error.value = "*File size exceeds the maximum limit of 5MB.";
        e.target.value = "";
        return false;
    }

    // Validation passed
    error.value = "";
    renderImage(file);
    return true;
};

const renderImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
        previewUrl.value = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};

const closeModal = () => {
    emit("closeModal");
};

const fileUpload = () => {
    const box = document.getElementById("image-highlight");
    const image = document.getElementById("image");
    const imageData = new Image();
    const boxPos = box.getBoundingClientRect();
    const imagePos = image.getBoundingClientRect();

    const canvas = document.createElement("canvas");
    imageData.src = previewUrl.value;

    // set the canvas dimensions to match the image dimensions
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    // draw the image onto the canvas
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    const xPos =
        ((boxPos.left - imagePos.left) / imagePos.width) * imageData.width;
    const yPos =
        ((boxPos.top - imagePos.top) / imagePos.height) * imageData.height;
    const width = (boxPos.width / imagePos.width) * imageData.width;
    const height = (boxPos.height / imagePos.height) * imageData.height;

    const croppedImage = context.getImageData(xPos, yPos, width, height);

    // create a new canvas element for the cropped image
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = croppedImage.width;
    croppedCanvas.height = croppedImage.height;

    // draw the cropped image onto the new canvas
    const croppedContext = croppedCanvas.getContext("2d");
    croppedContext.putImageData(croppedImage, 0, 0);
    resizeImage(croppedCanvas)
};

const resizeImage = (imageData) => {
    const resizeCanvas = document.createElement("canvas");
    resizeCanvas.width = PFPSIZE;
    resizeCanvas.height = PFPSIZE;

    const croppedImageObj = new Image();

    croppedImageObj.addEventListener("load", (e) => {
        const resizeCanvasContext = resizeCanvas.getContext("2d");
        resizeCanvasContext.drawImage(croppedImageObj, 0, 0, PFPSIZE, PFPSIZE);

        // get the data URL of the cropped image
        const pfpData = resizeCanvas.toDataURL();
        emit('submitUpload', pfpData);
        closeModal();
    });

    croppedImageObj.src = imageData.toDataURL();
};

const dragStart = (e) => {
    const currentLeft =
        parseInt(
            e.target.style.left.substring(0, e.target.style.left.length - 2)
        ) || 0;
    mousePosition.value = [e.pageX - currentLeft, e.pageY];
    mouseIsDown.value = true;
};

const drag = (e) => {
    if (mouseIsDown.value) {
        let fLeft = e.pageX - mousePosition.value[0];
        if (fLeft < 0) {
            fLeft = 0;
        } else if (
            fLeft >
            e.target.parentElement.offsetWidth - e.target.offsetWidth
        ) {
            fLeft = e.target.parentElement.offsetWidth - e.target.offsetWidth;
        }
        e.target.style.left = `${fLeft}px`;
    }
};
const dragEnd = (e) => {
    mouseIsDown.value = false;
};

const setWidthOrHeight = () => {
    const e = document.getElementById("image-highlight");
    if (e.offsetWidth > e.offsetHeight) {
        e.style.height = "100%";
    } else {
        e.style.width = "100%";
    }
};
</script>

<style scoped>
#image-highlight {
    box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.8);
}
</style>
