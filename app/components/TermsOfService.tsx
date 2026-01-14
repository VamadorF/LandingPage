'use client'

export default function TermsOfService() {
  return (
    <section id="terminos" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos de Servicio
          </h2>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Naturaleza del servicio</h3>
            <p className="text-base leading-relaxed">
              Esta plataforma ofrece una experiencia de acompañamiento conversacional mediada por IA. No es terapia ni asesoría médica, psicológica o legal. El uso que hagas de la compañera virtual es tu responsabilidad.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Qué recibes y cómo se entrega</h3>
            <p className="text-base leading-relaxed">
              Cada membresía especifica el número de interacciones semanales y el nivel de memoria que se conservará. Esos son los límites de lo que obtienes. Se describe claramente qué obtienes, cómo y cuándo lo recibes, qué ocurre si algo cambia y los límites de uso o revisiones{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Membresías y cancelación</h3>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
              <li><strong>Inicio:</strong> acceso continuo con memoria básica.</li>
              <li><strong>Amigo Cercano:</strong> mayor continuidad y contexto.</li>
              <li><strong>Mejor Amigo:</strong> máxima prioridad y profundidad de memoria.</li>
            </ul>
            <p className="text-base leading-relaxed mt-4">
              Las membresías son suscripciones recurrentes y el cobro se renueva automáticamente. Puedes cancelar en cualquier momento; la cancelación detiene cargos futuros pero no da derecho a reembolsos de periodos ya pagados{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Límites y uso personal</h3>
            <p className="text-base leading-relaxed">
              El acceso es solo para uso personal. No puedes compartir, reproducir ni reutilizar la experiencia o contenidos de la IA con fines comerciales sin autorización{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              . La IA puede registrar recuerdos de tus interacciones para ofrecer continuidad; no constituye un registro permanente o legal.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Reembolsos</h3>
            <p className="text-base leading-relaxed">
              Debido a la naturaleza digital y al carácter continuo del servicio, los pagos no son reembolsables. Solo se contemplan reembolsos en caso de fallo técnico grave que impida el uso del servicio. Las membresías pueden cancelarse en cualquier momento.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Contacto y soporte</h3>
            <p className="text-base leading-relaxed">
              Si tienes preguntas sobre tu plan o necesitas resolver un problema, contacta a través del correo de soporte indicado en la página. Se incluyen detalles de contacto para que puedas plantear tus dudas{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Protección de datos</h3>
            <p className="text-base leading-relaxed">
              Solo se utiliza la información personal necesaria para procesar tu pedido. No se comparte ni se utiliza para fines de marketing{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              . Consulta la política de privacidad para más detalles.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Modificaciones</h3>
            <p className="text-base leading-relaxed">
              Estos términos pueden actualizarse. Se mantendrán actualizados cuando cambien procesos como tiempos de entrega o normas de reembolso{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              . El uso continuado del servicio implica aceptación de los cambios.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Suspensión y conducta inapropiada</h3>
            <p className="text-base leading-relaxed">
              El uso indebido, abuso del sistema, violación de límites o actividades ilegales puede resultar en la suspensión o cancelación del acceso, sin reembolso.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}

