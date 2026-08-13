/**
 * Helper to extract translation fields from entities.
 */
export const getTranslationData = (
  entity: any,
  field: 'title' | 'description' | 'overview',
  langCode: string = 'en'
): string => {
  if (!entity) return '';

  if (entity.translations && Array.isArray(entity.translations) && entity.translations.length > 0) {
    const translation = entity.translations.find((t: any) => t.languageCode === langCode);
    if (translation && translation[field]) {
      return translation[field];
    }
    // Fallback to first available translation if requested language is missing
    if (entity.translations[0][field]) {
      return entity.translations[0][field];
    }
  }

  // Fallback to root property if translations are missing or empty
  return entity[field] || '';
};
