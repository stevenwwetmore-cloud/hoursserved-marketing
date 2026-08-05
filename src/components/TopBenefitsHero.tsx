import { CalendarDays, CheckCircle2, MailCheck, UploadCloud } from 'lucide-react';

type Locale = 'en' | 'es-419';
type Variant = 'default' | 'automated-csv';

const AUTOMATED_CSV_BENEFIT = {
  number: '03', icon: UploadCloud,
  title: 'Automated CSV reports',
  description: 'Automatically turn attendance, event, and volunteer-hour records into consistent CSV reports.',
  details: ['Build CSV reports from recorded attendance and volunteer hours', 'Keep report columns consistent across events and reporting periods', 'Download CSV files for review, sharing, or import into other systems'],
  featured: true,
};

const CONTENT = {
  en: {
    eyebrow: 'Top 3 HoursServed benefits',
    heading: 'Three workflows that give officers more time to serve',
    benefits: [
      {
        number: '01', icon: MailCheck,
        title: 'One-click attendance notification — no login required',
        description: 'Send attendance requests by email and let members respond Yes or No from any device without downloading an app or remembering a password.',
        details: ['Notify the full roster in seconds', 'Record attendance and service hours from one response', 'Keep a timestamped officer-ready record'],
      },
      {
        number: '02', icon: CalendarDays,
        title: 'Meetings and events drafted with Google Calendar download and sync',
        description: 'Import upcoming Google Calendar events into HoursServed as drafts, review them before activation, and give attendees a one-click Add to Google Calendar option.',
        details: ['Import upcoming Google Calendar events as drafts', 'Review duration and commute time before activation', 'Let members add confirmed events to Google Calendar'],
      },
      {
        number: '03', icon: UploadCloud,
        title: 'Automated Lion Portal uploads (available with LCI approval)',
        description: 'Automated Lion Portal uploads are coming soon, subject to written approval from Lions Clubs International',
        details: ['Capture Lion Portal-aligned fields during normal event entry', 'Route monthly activity reports for officer review and approval', 'Download CSV and PDF reports now; activate protected uploads only after approval'],
        featured: true,
      },
    ],
  },
  'es-419': {
    eyebrow: 'Los 3 principales beneficios de HoursServed',
    heading: 'Tres flujos de trabajo que dan a los oficiales más tiempo para servir',
    benefits: [
      {
        number: '01', icon: MailCheck,
        title: 'Notificación de asistencia con un solo clic — no se requiere iniciar sesión',
        description: 'Envía solicitudes de asistencia por correo electrónico y permite que los miembros respondan Sí o No desde cualquier dispositivo, sin descargar una aplicación ni recordar una contraseña.',
        details: ['Notifica a todos los miembros en segundos', 'Registra la asistencia y las horas de servicio con una sola respuesta', 'Conserva un registro con fecha y hora listo para los oficiales'],
      },
      {
        number: '02', icon: CalendarDays,
        title: 'Reuniones y eventos creados como borradores con descarga y sincronización de Google Calendar',
        description: 'Importa los próximos eventos de Google Calendar a HoursServed como borradores, revísalos antes de activarlos y ofrece a los asistentes la opción de agregarlos a Google Calendar con un solo clic.',
        details: ['Importa los próximos eventos de Google Calendar como borradores', 'Revisa la duración y el tiempo de traslado antes de activarlos', 'Permite que los miembros agreguen eventos confirmados a Google Calendar'],
      },
      {
        number: '03', icon: UploadCloud,
        title: 'Cargas automatizadas al Portal de Lions (disponibles con la aprobación de LCI)',
        description: 'Las cargas automatizadas al Portal de Lions estarán disponibles próximamente, sujetas a la aprobación por escrito de Lions Clubs International',
        details: ['Captura campos compatibles con el Portal de Lions durante el registro habitual de eventos', 'Envía los reportes mensuales de actividades para revisión y aprobación de los oficiales', 'Descarga reportes CSV y PDF ahora; activa las cargas protegidas únicamente después de recibir la aprobación'],
        featured: true,
      },
    ],
  },
};

export default function TopBenefitsHero({
  locale = 'en',
  variant = 'default',
}: {
  locale?: Locale;
  variant?: Variant;
}) {
  const baseCopy = CONTENT[locale] || CONTENT.en;
  const copy = variant === 'automated-csv'
    ? { ...baseCopy, benefits: [...baseCopy.benefits.slice(0, 2), AUTOMATED_CSV_BENEFIT] }
    : baseCopy;

  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 border-b border-gray-200" aria-labelledby={`top-benefits-title-${locale}`} data-testid="top-benefits-hero">
      <div className="max-w-7xl mx-auto rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm bg-[#F2F8F6] border-2 border-[#0F6E56]">
        <div className="max-w-3xl mb-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-[#0F6E56]">{copy.eyebrow}</p>
          <h2 id={`top-benefits-title-${locale}`} className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-[#1E3A5F]">{copy.heading}</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {copy.benefits.map(({ number, icon: Icon, title, description, details, featured }) => (
            <article key={number} className={`relative rounded-2xl bg-white p-5 sm:p-6 shadow-sm ${featured ? 'border-[3px] border-[#0F6E56]' : 'border border-[#C3D0D8]'}`}>
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${featured ? 'bg-[#0F6E56]' : 'bg-[#E7F4F0]'}`}>
                  <Icon className={`w-6 h-6 ${featured ? 'text-white' : 'text-[#0F6E56]'}`} aria-hidden="true" />
                </div>
                <span className="text-sm font-black tracking-widest text-[#607789]">{number}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black leading-tight mb-3 text-[#1E3A5F]">{title}</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-5 text-[#334E62]">{description}</p>
              <ul className="space-y-3">
                {details.map(detail => (
                  <li key={detail} className="flex items-start gap-2 text-sm leading-snug text-[#243B4A]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0F6E56]" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
