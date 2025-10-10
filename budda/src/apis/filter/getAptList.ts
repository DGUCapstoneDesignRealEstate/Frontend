import api from '../../api';

export default async function getAptList(selectedGu, selectedDong) {
  try {
    const response = await api.get('apartment-transactions/apartment-name', {
      params: {
        gu: selectedGu.name,
        dong: selectedDong.name,
        notValid: true,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
