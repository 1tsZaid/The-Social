export const FontFamily = {
  // Montserrat family
  montserratRegular: 'Montserrat-Regular',
  montserratSemiBold: 'Montserrat-SemiBold',
  montserratExtraBold: 'Montserrat-ExtraBold',
  
  // Poppins family
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  
  // Custom fonts
  spaceMono: 'SpaceMono',
} as const;

export const Typography = {
  // Headings using Montserrat
  h1: {
    fontFamily: FontFamily.montserratExtraBold,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FontFamily.montserratExtraBold,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  
  // Body text using Poppins
  bodyLarge: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 18,
    lineHeight: 26,
  },
  body: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: { //input
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Special use cases
  button: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: { //subtitle, label, dividertext, link before text
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  link: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  code: {
    fontFamily: FontFamily.spaceMono,
    fontSize: 14,
    lineHeight: 20,
  },
} as const;

export type TypographyVariant = keyof typeof Typography;