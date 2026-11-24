import { useParams, Link } from 'react-router';
import { ChevronLeft, GraduationCap } from 'lucide-react';
import { MOCK_UNIVERSITIES } from '@entities/university';
import { MOCK_FACULTIES_UNAMAD, CareerCard } from '@entities/career';

export function UniversityDetailsPage() {
  const { universityId } = useParams();
  
  // En un entorno real, haríamos fetch a la API. Aquí usamos MOCKS.
  const university = MOCK_UNIVERSITIES.find(u => u.id === universityId);
  const faculties = universityId === 'unamad' ? MOCK_FACULTIES_UNAMAD : [];

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-headline-lg text-primary-container font-bold mb-4">Universidad no encontrada</h2>
        <Link to="/universidades" className="text-primary hover:underline">Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-12">
      
      <Link to="/universidades" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-lg mb-8">
        <ChevronLeft className="w-5 h-5" /> Volver a Universidades
      </Link>

      {/* Cabecera Izquierda */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
        <div 
          className="h-24 min-w-[96px] px-6 w-auto rounded-2xl flex items-center justify-center text-white font-headline-lg text-[28px] font-bold tracking-widest shadow-sm shrink-0"
          style={{ backgroundColor: university.color }}
        >
          {university.initials}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-fit">
            <h1 className="font-headline-lg text-[32px] md:text-[40px] font-bold text-primary-container tracking-tight leading-tight relative z-10 pr-4">
              {university.name}
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
          </div>
          <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed">
            Selecciona tu facultad y carrera profesional para ver tu ruta académica.
          </p>
        </div>
      </div>

      {/* Lista de Facultades */}
      <div className="flex flex-col gap-12">
        {faculties.length > 0 ? (
          faculties.map((faculty) => (
            <div key={faculty.id} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-outline-variant pb-2">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-on-surface-variant" />
                </div>
                <h2 className="font-headline-sm text-[24px] font-bold text-primary-container">
                  {faculty.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0">
                {faculty.careers.map((career) => (
                  <CareerCard 
                    key={career.id} 
                    career={career} 
                    universityColor={university.color} 
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant rounded-sm">
            <p className="font-body-lg text-on-surface-variant">Aún no hay carreras mapeadas para esta universidad.</p>
          </div>
        )}
      </div>

    </div>
  );
}
