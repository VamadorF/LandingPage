'use client'

export default function PrivacyPolicy() {
  return (
    <section id="privacidad" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Privacidad
          </h2>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Datos que se recopilan</h3>
            <p className="text-base leading-relaxed">
              Se recogen datos básicos como nombre, dirección de correo electrónico y forma de pago para crear tu cuenta y gestionar los pagos. También se almacenan metadatos de tus interacciones con la compañera (número de mensajes, recuerdos conversacionales) para ofrecer continuidad. Este almacenamiento es temporal y limitado por el plan.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Uso de la información</h3>
            <p className="text-base leading-relaxed">
              La información se utiliza únicamente para prestar el servicio, procesar pagos, mantener las funciones de memoria y mejorar la calidad general. No se comparte con terceros salvo con procesadores de pago necesarios para completar la transacción y siempre bajo acuerdos de confidencialidad.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Protección de datos</h3>
            <p className="text-base leading-relaxed">
              Toda la información se mantiene bajo medidas de seguridad razonables para protegerla contra acceso no autorizado, divulgación o destrucción. Solo se usará tu información para procesar tu pedido y no se compartirá ni se usará para marketing{' '}
              <a href="https://help.ko-fi.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                help.ko-fi.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Retención y eliminación</h3>
            <p className="text-base leading-relaxed">
              Los datos se conservan mientras dure tu suscripción y el tiempo estrictamente necesario para cumplir con obligaciones legales o resolver disputas. Puedes solicitar la eliminación de tus datos personales y se atenderá siempre que no existan obligaciones legales que lo impidan.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Derechos del usuario</h3>
            <p className="text-base leading-relaxed">
              Puedes solicitar acceso, corrección o eliminación de tus datos, así como oponerte al tratamiento en determinadas circunstancias. Para ejercer estos derechos, contacta a través del correo de soporte.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cookies y analíticas</h3>
            <p className="text-base leading-relaxed">
              La página puede utilizar cookies para recordar tus preferencias y ofrecer una mejor experiencia de navegación. No se utilizan para rastreo publicitario. Al usar la web aceptas el uso de estas cookies funcionales.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cambios en esta política</h3>
            <p className="text-base leading-relaxed">
              Esta política puede actualizarse. Las modificaciones serán publicadas en la página y tendrán efecto inmediato. El uso continuado del servicio implica aceptación de la política revisada.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Contacto</h3>
            <p className="text-base leading-relaxed">
              Para cualquier consulta sobre privacidad, comunícate con el correo de soporte.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}

