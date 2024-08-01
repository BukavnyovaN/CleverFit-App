import { NewTraining } from "@utils/helpers/generate-trainings-data.ts";
import { formatDateToIsoString } from "@utils/helpers/format-date-to-iso-string.ts";

export const checkObjectByDateAndName = (obj : NewTraining, dateString : string, name : string) : boolean => {
    const targetDate = formatDateToIsoString(dateString);
    return obj.date === targetDate && obj.name === name;
}
