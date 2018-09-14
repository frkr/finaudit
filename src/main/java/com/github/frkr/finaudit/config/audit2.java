//package br.com.porto.seguranca.utilitariossi.config;
//
//import org.springframework.data.domain.AuditorAware;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.ldap.userdetails.LdapUserDetails;
//
//import java.util.Optional;
//
//  XXX
//
//
//public class AuditorAwareImpl implements AuditorAware<String> {
//    @Override
//    public Optional<String> getCurrentAuditor() {
//        // AD // InetOrgPerson user = (InetOrgPerson) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        return Optional.ofNullable((user == null) ? null : ((LdapUserDetails) user).getUsername());
////        return "disabled";
//    }
//}
