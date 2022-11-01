const fieldsList = [
  'transport_type_choice_name',
  'transport_type_choice_street',
  'transport_type_choice_city',
  'transport_type_choice_zip',
  'transport_type_choice_description',
  'transport_type_choice_email',
  'transport_type_choice_ext_code',
  'transport_type_choice_url',
  'transport_type_choice_gps',
  'transport_type_choice_photo'
]

const fillPickupPoint = point => {
  for (let field of fieldsList) {
    let domField = document.querySelector(`[name=${field}]`)

    if (domField) {
      domField.value = point === null ? null : point[field] ?? null
    }
  }
}

export default fillPickupPoint
