function updateAvatar() {
  const $ = document.querySelector.bind(document);
  let fileData = $('#avatar-server').files[0];
  let math = ['image/png', 'image/jpg', 'image/jpeg'];
  let limit = 1048576; // 1MB

  if (!math.some(type => type === fileData.type)) {
    $('#avatar-server').parentElement.classList.add('invalid');
    $('#avatar-server').parentElement.querySelector(
      '.form-message'
    ).textContent = 'Kiểu file không hợp lệ [png, jpg, jpeg]';
    $('#avatar-server').value = '';
    $('.upload-avatar-img').querySelector('img').src =
      '../assets/images/photo-camera.svg';
    return false;
  }
  if (fileData.size > limit) {
    $('#avatar-server').parentElement.classList.add('invalid');
    $('#avatar-server').parentElement.querySelector(
      '.form-message'
    ).textContent = 'Kích thước ảnh tối đa là 1M';
    $('#avatar-server').value = '';
    $('.upload-avatar-img').querySelector('img').src =
      '../assets/images/photo-camera.svg';
    return false;
  }
  $('#avatar-server').parentElement.classList.remove('invalid');
  $('#avatar-server').parentElement.querySelector(
    '.form-message'
  ).textContent = fileData.name;

  const fileReader = new FileReader();
  fileReader.onload = element => {
    let imagePreview = $('.upload-avatar-img');
    imagePreview.innerHTML = '';
    const img = document.createElement('img');
    img.src = element.target.result;
    img.alt = 'avatar';
    img.id = 'group-avatar';
    imagePreview.appendChild(img);
  };
  fileReader.readAsDataURL(fileData);
  return fileData;
}

function onblurCreateServer() {
  const $ = document.querySelector.bind(document);
  if (!$('.form-control').value) {
    $('.form-control').parentElement.classList.add('invalid');
    $('.form-control').parentElement.querySelector(
      '.form-message'
    ).innerHTML = 'Vui lòng nhập tên group';
    $('#finished-create-server').classList.add('disabled');
  }
}

function oninputCreateServer() {
  const $ = document.querySelector.bind(document);
  if ($('.form-control').value) {
    $('.form-control').parentElement.classList.remove('invalid');
    $('.form-control').parentElement.querySelector(
      '.form-message'
    ).innerHTML = '';
    $('#finished-create-server').classList.remove('disabled');
  }
}

function submitCreateServer() {
  const $ = document.querySelector.bind(document);
  const formValues = {};
  $('#submit-create-server')
    .querySelectorAll('input[name]')
    .forEach(input => {
      if (input.type == 'file') {
        if (!input.files[0]) {
          formValues['avatarServer'] = null;
        } else {
          formValues['avatarServer'] = input.files[0];
        }
      }
      if (input.type == 'text') {
        if (!input.value) {
          $('.form-control').parentElement.classList.add('invalid');
          $('.form-control').parentElement.querySelector(
            '.form-message'
          ).innerHTML = 'Vui lòng nhập tên group';
          $('#finished-create-server').classList.add('disabled');
        } else {
          formValues['nameServer'] = input.value;
        }
      }
    });
  // call API
  return formValues;
}

function handleHideShow(e) {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  $('#toggle-menu-user').classList.toggle('d-none');
  $('.friend-box .title').onmouseover = e => {
    $('#toggle-menu-user').classList.add('d-none');
  };

  Array.from($$('.list-contact .field-name')).forEach(
    element =>
      (element.onmouseover = e => {
        $('#toggle-menu-user').classList.add('d-none');
      })
  );
}

const getUserTableCell = element => {
  return element.parentElement.parentElement.parentElement;
};

const getDataIdUserTableCell = element => {
  return getUserTableCell(element).dataset.id;
};

const removeElementByDataId = element => {
  let dataId = getDataIdUserTableCell(element);
  getUserTableCell(element).remove();
  return dataId;
};
const removeElement = element => {
  element.remove()
}

