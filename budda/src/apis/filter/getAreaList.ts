import api from '../../api';

export default async function getAreaList(
  selectedGu,
  selectedDong,
  selectedApt
) {
  try {
    const response = await api.get('apartment-transactions/area', {
      params: {
        gu: selectedGu.name,
        dong: selectedDong.name,
        apartmentName: selectedApt.apartmentName,
        notValid: true,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
